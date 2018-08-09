// withAuth - Higher order component for AuthService
// =================================================

import React, { Component } from 'react';
import AuthService from '../services/AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService
}
