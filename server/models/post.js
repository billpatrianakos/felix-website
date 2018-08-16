// Post model
// ==========
const Bookshelf   = require(__dirname + '/../config/db');
const MarkdownIt  = require('markdown-it');
const md          = new MarkdownIt();
require('./user');

let Post = Bookshelf.Model.extend({
  initialize: function() {
    this.constructor.__super__.initialize.apply(this, arguments);
    this.on('saving', this.parseMarkdown, this);
    this.on('saving', this.createSlug, this);
  },
  tableName: 'posts',
  hasTimestamps: true,
  author: function() {
    return this.belongsTo('User');
  },
  parseMarkdown: function() {
    let parsedBody = md.render(this.get('body_markdown'));
    this.set('body', parsedBody);
  },
  createSlug: function() {
    if (this.get('slug') === '') {
      let slug = this.get('title').toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
      this.set('slug', slug);
    }
  }
});

module.exports = Bookshelf.model('Post', Post);
