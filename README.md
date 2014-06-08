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
```
parker css/
```

### Measuring a Remote Stylesheet Using Curl

```
curl http://www.katiefenn.co.uk/css/shuttle.css -s | parker -s
```

### Output JSON

```
parker example.css --format=json
```

## Documentation

Documentation can be found in markdown format the [docs folder](https://github.com/katiefenn/parker/tree/master/docs).

## Testing

From the repo root:

```
npm install
npm test
```

## Contributing

Pull requests, issues, new unit tests, code reviews and good advice are all things that would make a difference to Parker. You can even contribute by telling me how useful Parker is to you; please let me know on Twitter at @katie_fenn. Any time generously donated to helping make Parker better is gratefully accepted, and in return I shall do my best to merge contributions.

Please target pull requests at the "develop" branch.

## About

Parker is my first open source project, and your suggestions and feedback are welcome. The project is in a pre-beta phase and is liable to change at any time. Parker is named for the character Parker from Gerry Anderson's Thunderbirds, without which my interest in technology and computers would certainly not be what it is today. Parker is Nosey about your stylesheets.
