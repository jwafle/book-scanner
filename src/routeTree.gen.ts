/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as ShadcnTestImport } from './routes/shadcn-test'
import { Route as LogoutImport } from './routes/logout'
import { Route as LoginImport } from './routes/login'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as AuthedPostsImport } from './routes/_authed/posts'
import { Route as AuthedCameraImport } from './routes/_authed/camera'
import { Route as AuthedPostsIndexImport } from './routes/_authed/posts.index'
import { Route as AuthedPostsPostIdImport } from './routes/_authed/posts.$postId'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const ShadcnTestRoute = ShadcnTestImport.update({
  id: '/shadcn-test',
  path: '/shadcn-test',
  getParentRoute: () => rootRoute,
} as any)

const LogoutRoute = LogoutImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthedPostsRoute = AuthedPostsImport.update({
  id: '/posts',
  path: '/posts',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedCameraRoute = AuthedCameraImport.update({
  id: '/camera',
  path: '/camera',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedPostsIndexRoute = AuthedPostsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthedPostsRoute,
} as any)

const AuthedPostsPostIdRoute = AuthedPostsPostIdImport.update({
  id: '/$postId',
  path: '/$postId',
  getParentRoute: () => AuthedPostsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/logout': {
      id: '/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof LogoutImport
      parentRoute: typeof rootRoute
    }
    '/shadcn-test': {
      id: '/shadcn-test'
      path: '/shadcn-test'
      fullPath: '/shadcn-test'
      preLoaderRoute: typeof ShadcnTestImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/_authed/camera': {
      id: '/_authed/camera'
      path: '/camera'
      fullPath: '/camera'
      preLoaderRoute: typeof AuthedCameraImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/posts': {
      id: '/_authed/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof AuthedPostsImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/posts/$postId': {
      id: '/_authed/posts/$postId'
      path: '/$postId'
      fullPath: '/posts/$postId'
      preLoaderRoute: typeof AuthedPostsPostIdImport
      parentRoute: typeof AuthedPostsImport
    }
    '/_authed/posts/': {
      id: '/_authed/posts/'
      path: '/'
      fullPath: '/posts/'
      preLoaderRoute: typeof AuthedPostsIndexImport
      parentRoute: typeof AuthedPostsImport
    }
  }
}

// Create and export the route tree

interface AuthedPostsRouteChildren {
  AuthedPostsPostIdRoute: typeof AuthedPostsPostIdRoute
  AuthedPostsIndexRoute: typeof AuthedPostsIndexRoute
}

const AuthedPostsRouteChildren: AuthedPostsRouteChildren = {
  AuthedPostsPostIdRoute: AuthedPostsPostIdRoute,
  AuthedPostsIndexRoute: AuthedPostsIndexRoute,
}

const AuthedPostsRouteWithChildren = AuthedPostsRoute._addFileChildren(
  AuthedPostsRouteChildren,
)

interface AuthedRouteChildren {
  AuthedCameraRoute: typeof AuthedCameraRoute
  AuthedPostsRoute: typeof AuthedPostsRouteWithChildren
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedCameraRoute: AuthedCameraRoute,
  AuthedPostsRoute: AuthedPostsRouteWithChildren,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/shadcn-test': typeof ShadcnTestRoute
  '/signup': typeof SignupRoute
  '/camera': typeof AuthedCameraRoute
  '/posts': typeof AuthedPostsRouteWithChildren
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/posts/': typeof AuthedPostsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/shadcn-test': typeof ShadcnTestRoute
  '/signup': typeof SignupRoute
  '/camera': typeof AuthedCameraRoute
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/posts': typeof AuthedPostsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/shadcn-test': typeof ShadcnTestRoute
  '/signup': typeof SignupRoute
  '/_authed/camera': typeof AuthedCameraRoute
  '/_authed/posts': typeof AuthedPostsRouteWithChildren
  '/_authed/posts/$postId': typeof AuthedPostsPostIdRoute
  '/_authed/posts/': typeof AuthedPostsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/logout'
    | '/shadcn-test'
    | '/signup'
    | '/camera'
    | '/posts'
    | '/posts/$postId'
    | '/posts/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/logout'
    | '/shadcn-test'
    | '/signup'
    | '/camera'
    | '/posts/$postId'
    | '/posts'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/login'
    | '/logout'
    | '/shadcn-test'
    | '/signup'
    | '/_authed/camera'
    | '/_authed/posts'
    | '/_authed/posts/$postId'
    | '/_authed/posts/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
  LoginRoute: typeof LoginRoute
  LogoutRoute: typeof LogoutRoute
  ShadcnTestRoute: typeof ShadcnTestRoute
  SignupRoute: typeof SignupRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
  LoginRoute: LoginRoute,
  LogoutRoute: LogoutRoute,
  ShadcnTestRoute: ShadcnTestRoute,
  SignupRoute: SignupRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authed",
        "/login",
        "/logout",
        "/shadcn-test",
        "/signup"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/camera",
        "/_authed/posts"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/logout": {
      "filePath": "logout.tsx"
    },
    "/shadcn-test": {
      "filePath": "shadcn-test.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/_authed/camera": {
      "filePath": "_authed/camera.tsx",
      "parent": "/_authed"
    },
    "/_authed/posts": {
      "filePath": "_authed/posts.tsx",
      "parent": "/_authed",
      "children": [
        "/_authed/posts/$postId",
        "/_authed/posts/"
      ]
    },
    "/_authed/posts/$postId": {
      "filePath": "_authed/posts.$postId.tsx",
      "parent": "/_authed/posts"
    },
    "/_authed/posts/": {
      "filePath": "_authed/posts.index.tsx",
      "parent": "/_authed/posts"
    }
  }
}
ROUTE_MANIFEST_END */
