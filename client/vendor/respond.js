"use strict";

/**
  Module for managing response formats. The module exports a single function
  that creates the FormatChooser with the supplied HTTP response. Use it like
  require("respondjs")().json(jsonResponseFunc).xml(xmlResponseFun).respond(req, res)

  @module respond
*/

var formatAliases = {
  json:  "application/json",
  text:  "text/plain",
  txt:   "text/plain",
  plain: "text/plain",
  xml:   "text/xml",
  html:  "text/html"
};

/**
  The class that implements the formatting decisions.

  @class FormatChooser
  @constructor
*/
var FormatChooser = function() {
  var _index = 0;
  var _self = this;

  /**
    This handler is called before any format handler is chosen. This can be used to
    load request-specific data. The function signature is function(req, res, next),
    where "next" is for compatibility with express.js.

    @property beforeHandler {Function}
  */
  this.beforeHandler = null;

  /**
    This handler is called after the format handler has been applied. This can be used to
    clean up resources. The function signature is function(req, res, format, next), where format is
    either a string representing the chosen format or null if no handler could be found.

    @property afterHandler {Function}
  */
  this.afterHandler = null;

  /**
    The available formats as a dictionary. The format string (after alias-mapping)
    is used as the key. The value is an object with the properties "format" (the format
    string) and "callback" (the callback to be called).

    @property formats {Object}
  */
  this.formats = {};

  /**
    Add any format to the list of available response formats. If the format fits when the
    {{#crossLink respond}}{{/crossLink}} method is called, the callback will be used to create
    the response.

    @method to
    @param format {String} A string describing the format. This can either be the full MIME type
      or an alias that gets mapped by the formatAliases map.
    @param callback Right now, this is simply a callback function that will be called if the
      corresponding format is used for responding. The callback function signature is
      function(req, res, format), with req and res being the HTTP request/response respectively
      and format being the cannonical format string (aka after applying the formatAliases map).
    @return Returns a reference to this object to allow chaining of method calls.
  */
  this.to = function(format, callback) {
    if(formatAliases[format] != null) { format = formatAliases[format]; }
    this.formats[format] = {
      format: format,
      callback: callback
    };

    return this;
  };

  /**
    Adds an application/json response to the list of available formats. This is simply
    a wrapper to {{#crossLink to}}{{/crossLink}}.

    @method json
    @param callback See {{#crossLink to}}{{/crossLink}}.
    @return Returns a reference to this object to allow call chaining.
  */
  this.json = function(callback) {
    return this.to("application/json", callback);
  };

  /**
    Adds a text/html response to the list of available formats. This is simply
    a wrapper to {{#crossLink to}}{{/crossLink}}.

    @method html
    @param callback See {{#crossLink to}}{{/crossLink}}.
    @return Returns a reference to this object to allow call chaining.
  */
  this.html = function(callback) {
    return this.to("text/html", callback);
  };

  /**
    Adds a text/xml response to the list of available formats. This is simply
    a wrapper to {{#crossLink to}}{{/crossLink}}.

    @method xml
    @param callback See {{#crossLink to}}{{/crossLink}}.
    @return Returns a reference to this object to allow call chaining.
  */
  this.xml = function(callback) {
    return this.to("text/xml", callback);
  };

  /**
    Adds a text/plain response to the list of available formats. This is simply
    a wrapper to {{#crossLink to}}{{/crossLink}}.

    @method text
    @param callback See {{#crossLink to}}{{/crossLink}}.
    @return Returns a reference to this object to allow call chaining.
  */
  this.text = function(callback) {
    return this.to("text/plain", callback);
  };

  /**
    Sets the default handler that will be called if no other format applies.

    @method
    @param callback Either a callback function or a string. If a string is supplied,
      it is treated as the default format and the callback of that format is
      called instead.
  */
  this.defaultTo = function(callback) {
    return this.to("*", callback);
  };

  /**
    Set the beforeHandler.

    @method before
    @return Returns a reference to this object.
  */
  this.before = function(callback) {
    this.beforeHandler = callback;
    return this;
  }

  /**
    Set the afterHandler.

    @method after
    @return Returns a reference to this object.
  */
  this.after = function(callback) {
    this.afterHandler = callback;
    return this;
  }

  var _respond1 = function(req, res, next) {
    var responder;
    if(req.params != null && req.params.format != null) {
      var format = req.params.format.trim();
      if(format[0] === ".") { format = format.substr(1); }
      if(format.length > 0) {
        if(formatAliases[format] != null) { format = formatAliases[format]; }
        responder = this.formats[format];
      }
    }

    if(responder == null) {
      var acceptableFormats = [];
      for(var i = 0; i < this.formats.length; i++) {
        var format = this.formats[i];
        if(format.format != null && format.format.length > 0 && format.format !== "*" && format.format !== "default") {
          acceptableFormats.push(format);
        }
      }
      var bestFit = req.accepts(acceptableFormats);
      if(bestFit != null) {
        responder = this.formats[bestFit];
      }
    }

    if(responder == null) {
      responder = this.formats["*"];
      if(responder == null) {
        responder = this.formats["default"];
      }
    }

    if(responder != null && typeof(responder.callback) === "string") {
      if(formatAliases[responder.callback] != null) {
        responder = formatAliases[responder.callback];
      } else {
        responder = responder.callback;
      }
      responder = this.formats[responder];
    }

    if(responder != null && typeof(responder) === "object") {
      req.continue = function() { return _respond2.call(_self, req, res, next, responder.format); };
      res.set("Content-Type", responder.format);
      responder.callback(req, res, responder.format);
    } else {
      res.set("Content-Type", "application/json");
      res.status(406).json({message: "Not acceptable"});
      return _respond2.call(_self, req, res, next, null);
    }
  };

  var _respond2 = function(req, res, next, format) {
    if(this.afterHandler != null && typeof(this.afterHandler) === "function") {
      return this.afterHandler(req, res, format);
    }
  };

  /**
    Executes the response rules. This method extracts the requested format from
    req.params.format and the Accept header an calls the corresponding callback
    function.

    @method respond
    @param req The HTTP request object.
    @param res The HTTP response object.
    @param next This is provided to all callbacks (before, format handler after) as the last
      parameter. If the "respond" method is used with express, next will be the callback provided
      by the express call.
  */
  this.respond = function(req, res, next){
    if(this == null) {
      return _self.respond.call(_self, req, res, next);
    }

    if(this.beforeHandler != null && typeof(this.beforeHandler) === "function") {
      req.continue = function() { return _respond1.call(_self, req, res, next); };
      return this.beforeHandler(req, res, next);
    } else {
      return _respond1.call(_self, req, res, next);
    }
  };
};

/**
  A map from "format alias" to "cannonical format name". E.g. the format "json"
  will be mapped to "application/json", the formats "plain" and "text" will be 
  mapped to "text/plain" and so on. This can either be accessed using the respond
  object require("respondjs")(res).formatAliases or using the module reference
  require("respondjs").formatAliases.

  @property formatAliases
  @static
*/
FormatChooser.formatAliases = formatAliases;

module.exports = function() {
  return new FormatChooser();
};

module.exports.formatAliases = formatAliases;
