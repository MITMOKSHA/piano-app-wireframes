const pptxgen = require('/Users/moksha/aiFirst/app/piano-wireframes/node_modules/pptxgenjs');
const html2pptx = require('/Users/moksha/.agents/skills/pptx/scripts/html2pptx');
const path = require('path');

async function create() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = '钢琴机构管理App - 页面线框图';

  const slides = [
    '/Users/moksha/aiFirst/app/piano-wireframes/slide1.html',
    '/Users/moksha/aiFirst/app/piano-wireframes/slide2.html',
    '/Users/moksha/aiFirst/app/piano-wireframes/slide3.html',
    '/Users/moksha/aiFirst/app/piano-wireframes/slide4.html',
  ];

  for (const s of slides) {
    await html2pptx(s, pptx);
  }

  await pptx.writeFile({ fileName: '/Users/moksha/aiFirst/app/piano-wireframes/piano-wireframes.pptx' });
  console.log('Done!');
}

create().catch(console.error);
