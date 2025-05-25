import { build as buildCSS } from './build-css'

import { buildV4 } from './build-tailwind4-css'

import { generateTailwindConfig } from './generate-tailwind-config'

async function build() {
  console.log('开始构建...')

  // 先构建CSS文件
  console.log('1. 构建CSS变量文件...')
  await buildCSS()

  // 然后生成Tailwind配置
  console.log('2. 生成Tailwind配置...')
  await generateTailwindConfig()

  console.log('3. 构建Tailwind v4 CSS...')
  await buildV4()

  console.log('构建完成！')
}

// 执行构建
build().catch(console.error)
