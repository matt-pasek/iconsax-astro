import { optimize as optimizeSvg } from 'svgo';
import fs from 'fs/promises';
import ps from 'path/posix';

const toAstroComponent = (svgColl, title) => `
---
export { Props } from './Props';

let {
	size,
	title,
	width = size,
	height = size,
	type,
	svg = '${svgColl[0][1]}',
	...props
} = {
	'fill': '#FFFFFF',
	'fill-rule': 'evenodd',
	'title': '${title}',
	'viewBox': '0 0 24 24',
	...Astro.props
}

const styleDictionary = { 
  'bold': '${svgColl[0][1]}',
  'broken': '${svgColl[1][1]}',
  'bulk': '${svgColl[2][1]}',
  'linear': '${svgColl[3][1]}',
  'outline': '${svgColl[4][1]}',
  'twotone': '${svgColl[5][1]}'
}

const toAttributeSize = (size: number) => String(size).replace(/(?<=[0-9])x$/, 'em');

size = toAttributeSize(size);
width = toAttributeSize(width);
height = toAttributeSize(height);
svg = '<title>${title}</title>' + styleDictionary[type];
---
<svg set:html={svg} width{width} height={height} {...props}></svg>
`;

const toInnerSvg = (input) =>
  optimizeSvg(input, {
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeXMLNS',
      'removeEditorsNSData',
      'cleanupAttrs',
      'minifyStyles',
      'convertStyleToAttrs',
      'cleanupIds',
      'removeRasterImages',
      'removeUselessDefs',
      'cleanupNumericValues',
      'cleanupListOfValues',
      'convertColors',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'removeViewBox',
      'cleanupEnableBackground',
      'removeHiddenElems',
      'removeEmptyText',
      'convertShapeToPath',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      'convertPathData',
      'convertTransform',
      'removeEmptyAttrs',
      'removeEmptyContainers',
      'mergePaths',
      'removeUnusedNS',
      'sortAttrs',
      'removeTitle',
      'removeDesc',
      'removeDimensions',
      'removeStyleElement',
      'removeScriptElement',
    ],
  })
    .data.replace(/^<svg[^>]*>|<\/svg>$/g, '')
    .replace(/ fill="#292D32"/g, '')
    .replace(/ stroke="#292D32"/g, '')
    .replace(/ fill="#000"/g, '')
    .replace(/ stroke="#000"/g, '')
    .replace(/ (clip|fill)-rule="evenodd"/g, '')
    .replace(/\/>/g, ' />');

// paths
const currentDir = ps.resolve('.'); // current directory
const iconsDir = ps.resolve(currentDir, 'icons'); // icons directory
const distDir = ps.resolve(currentDir, 'dist'); // distribution directory

// Content of the main entry `index.ts` file
let contentOfIndexJS = '';

// clean the distribution directory
await fs.rm(distDir, { force: true, recursive: true });
await fs.mkdir(distDir, { recursive: true });

// icons data
const icons = [];

// copy the attribute typings file
await fs.copyFile(ps.resolve(currentDir, 'Props.ts'), ps.resolve(distDir, 'Props.ts'));

// convert the SVG files into Astro components
for (let filepath of await fs.readdir(iconsDir, { encoding: 'utf8' })) {
  console.log('Handling', filepath, '...');

  // read each child folder
  const childDir = ps.resolve(iconsDir, filepath);
  if ((await fs.stat(childDir)).isDirectory()) {
    // base name of the icon is a name of the folder
    const name = filepath;

    // format the title
    const title = name
      .replace(
        // uppercase alphabetic characters after the start or a dash
        /(?<=^|-)([a-z])/g,
        (_0, $1) => $1.toUpperCase(),
      )
      .replace(
        // replace non-alphanumeric characters with space
        /[^A-Za-z0-9]+/g,
        ' ',
      );

    // base name is the title without spaces
    const baseName = title.replace(/ /g, '');

    // collection of icon types (bold, broken, bulk, linear, outline, twotone)
    let svgCollection = [];

    // read icons from the child folder
    for (let childFilepath of await fs.readdir(childDir, { encoding: 'utf8' })) {
      if (!childFilepath.endsWith('.svg')) continue;

      // get full path of the icon
      childFilepath = ps.resolve(childDir, childFilepath);

      // generate inner content of the SVG
      const innerSvg = toInnerSvg(await fs.readFile(childFilepath, 'utf8'));

      // get the icon type
      const type = ps.basename(childFilepath, '.svg');

      // add the icon to the collection
      svgCollection.push([type, innerSvg]);

      // sort the collection by the icon type
      svgCollection.sort((a, b) => a[0].localeCompare(b[0]));
    }

    // generate the Astro component
    await fs.writeFile(
      ps.resolve(distDir, `${baseName}.astro`),
      toAstroComponent(svgCollection, title),
      'utf8',
    );

    // add the Astro component to the index file
    contentOfIndexJS += `export { default as ${baseName} } from './${baseName}.astro';\n`;

    // add the icon to the list
    icons.push({ name, title, baseName });
  }
}

// write to the main entry `index.ts` file
await fs.writeFile(ps.resolve(distDir, 'index.ts'), contentOfIndexJS, 'utf8');

// copy types.d.ts file
await fs.copyFile(ps.resolve(currentDir, 'types.d.ts'), ps.resolve(distDir, 'types.d.ts'));

console.log('Build completed successfully.');
