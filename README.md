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

### Output JSON

```
parker example.css --json
```

## Testing

From the repo root:

```
npm install
npm test
```

## About

Parker is my first open source project, and your suggestions and feedback are welcome. The project is in a pre-beta phase and is liable to change at any time. Parker is named for the character Parker from Gerry Anderson's Thunderbirds, without which my interest in technology and computers would certainly not be what it is today. Parker is very Nosey about your stylesheets.
