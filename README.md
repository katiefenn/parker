# Parker

Parker is a stylesheet analysis tool. It runs metrics on your stylesheets and will report on their complexity.

[![Build Status](https://secure.travis-ci.org/katiefenn/parker.png?branch=master)](http://travis-ci.org/katiefenn/parker)


## Installation

Install with npm:

```
npm install -g parker
```

## Usage

### Measuring Local Stylesheets

```
parker a.css b.css c.css
```

### Measuring a Remote Stylesheet Using Curl

```
curl http://www.katiefenn.co.uk/css/shuttle.css -s | parker
```

## Testing

From the repo root:

```
npm install
npm test
```
