# Usage
Parker is a command-line tool. Switches and options are used to control how it works. By default Parker runs with recommended settings for beginners to aid discoverability. To make the most of Parker, it is recommended users read about the available options and choose which metrics are most useful to them.

	parker [arguments] [file...]

Measuring local stylesheets:

	parker a.css b.css c.css

Measuring all local stylesheets in a directory:

	parker css/

Measuring a remote stylesheet using curl:

	curl http://www.katiefenn.co.uk/css/shuttle.css -s | parker

<a name="options"></a>
## Options
### -f --format
Set output format.

Formats:

- __human__: Default. Human-readable format.
- __json__: JSON format for integration with scripts.
- __csv__: Comma-separated-value format for output to spreadsheets.

### -h --help
Shows help.

### -n --numeric
Run numeric-format metrics only. Useful for making benchmarks.

### -s --stdin
Input CSS using stdin.

### -v --version
Show version number of Parker.