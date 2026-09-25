# Readme Color Icons

Generate color palettes as SVG images directly from a URL.

Color Icons is a small API designed to make it easy to display custom color palettes in GitHub README files.

## Usage

Add a palette directly to your README:

`![My Palette](https://your-domain.com/palette?c=050505,d4d4d4,8d8d8d,ffffff)`

The palette is generated dynamically from the colors provided in the URL.

## API

### `GET /palette`

Generates an SVG color palette.

#### Parameters

| Parameter   | Required | Description                |
| ----------- | -------- | -------------------------- |
| `c`         | Yes      | Comma-separated HEX colors |
| `direction` | No       | `horizontal` or `vertical` |

### Colors

Colors must be valid 6-digit HEX values.

Example:

```text
/palette?c=050505,d4d4d4,8d8d8d,ffffff
```
