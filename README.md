# HeboTV

A opensource IPTV client

## Download

Go [here](https://github.com/hebotv/hebotv/releases) to get latest releases.

## Development

### Prerequisites

* Install Node.js with version >= 14
* Install NPM or Yarn

### Setup

Clone this repo:

```
$ git clone https://github.com/hebotv/hebotv.git
$ cd hebotv
$ yarn
```

Start web server:

```
$ yarn web
```

Start electron app:

In other console:


```
$ yarn app
```

### Build package

To build package for current system

```
yarn package
```

To build a Linux package(deb, AppImage, snap)

```
yarn workspace hebotv-app package-linux
```

To build a macOS package

```
yarn workspace hebotv-app package-mac
```

To build a Windows package

```
yarn workspace hebotv-app package-win
```

To build for all

```
yarn package-all
```
