# iconsax for Astro framework

992 icons in 6 different styles | 24px grid-based

[![npm version](https://badge.fury.io/js/iconsax-astro.svg)](https://badge.fury.io/js/iconsax-astro)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

```bash
npm i iconsax-astro
# or
yarn add iconsax-astro
```

## Usage

All the icons are available as components.

```astro
---
import { Aave, Activity, AlignVertically } from 'iconsax-astro';
---

<Aave type="outline" />
<Activity type="linear" />
<AlignVertically type="bold" size="50" fill="#101010" />
```

You can also import the icons individually...

```astro
---
import AaveIcon from 'iconsax-astro/Aave';
import ActivityIcon from 'iconsax-astro/Activity';
import AlignVerticallyIcon from 'iconsax-astro/AlignVertically';
---

<AaveIcon type="outline" />
<ActivityIcon type="linear" />
<AlignVerticallyIcon type="bold" size="50" fill="#101010" />
```

...or all at once, and only the icons that are used will be added to the page.

```astro
---
import * as Icon from 'iconsax-astro';
---

<Icon.Aave type="outline" />
<Icon.Activity type="linear" />
<Icon.AlignVertically type="bold" size="50" fill="#101010" />
```

Each icon has a default size of `24px` and default type `linear`.

## Props

The following `Props` interface is available to every icon:

```ts
export interface Props {
  fill?: string;
  'fill-opacity'?: number | string;
  'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit';
  height?: number | string;
  size?: number | string;
  stroke?: string;
  'stroke-dasharray'?: string | number;
  'stroke-dashoffset'?: string | number;
  'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit';
  'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit';
  'stroke-miterlimit'?: number | string;
  'stroke-opacity'?: number | string;
  'stroke-width'?: number | string;
  viewBox?: string;
  width?: number | string;
  type?: 'bold' | 'broken' | 'bulk' | 'linear' | 'outline' | 'twotone';
  color?: string;
}
```

- The `Props` interface additionally includes:
  - All HTML global attributes.
  - All WAI-ARIA attributes and the WAI-ARIA role attribute.
- The `title` attribute transforms into a `<title>` element within the `<svg>`.
- The `size` attribute transforms values like `1.5x` into `1.5em`.
- The `size` attribute is used as the default values for `width` and `height`.
- The `color` attribute is used as the default value for `fill` and/or `stroke` (depending on the
  icon).

## Available icons

Website showcasing every icon and its types will be avaialble soon.

## Acknowledgements

This package is maintained by [matt-pasek](https://github.com/matt-pasek) and based on
[@astropub/icons](https://github.com/astro-community/icons).
