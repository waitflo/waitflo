import classNames from 'classnames'
import * as React from 'react'
import { Repeater, RichText, types } from 'react-bricks/rsc'
import {
  textGradientEditProps,
  highlightTextEditProps,
  sectionDefaults,
  LayoutProps,
  backgroundWithImageBgSideGroup,
  paddingBordersSideGroup,
} from '../../LayoutSideProps'
import blockNames from '../../blockNames'
import {
  buttonColors,
  gradients,
  highlightTextColors,
  textColors,
} from '../../colors'
import Container from '../../shared/components/Container'
import Section from '../../shared/components/Section'

export interface HeroUnitProps extends LayoutProps {
  size: 'medium' | 'large'
  textGradient: keyof typeof gradients
  highlightTextColor: { color: string; className: string }
  title: types.TextValue
  text: types.TextValue
  buttons: types.RepeaterItems
  badge: types.RepeaterItems
}

const HeroUnit: types.Brick<HeroUnitProps> = () => {
  return (
    <Section backgroundColor="bg-gradient-to-br from-[#0f1123] to-[#1a1037]">
      <Container paddingTop="24" paddingBottom="24">
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
          <div className="mb-2 text-xs font-semibold text-[#b6a6f7] tracking-widest flex items-center gap-2">
            INTRODUCING FUSION <span className="border border-[#b6a6f7] rounded px-2 py-0.5 text-[10px] ml-2">BETA</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-2 mt-2">What should we build?</h1>
          <div className="text-lg md:text-xl font-medium text-[#b6b6c7] text-center mb-8">using your existing design & code context</div>
          <div className="w-full max-w-2xl bg-[#18192a] rounded-lg shadow-lg p-0.5">
            <div className="flex items-center px-4 py-2">
              <input
                className="flex-1 bg-transparent text-white placeholder-[#b6b6c7] border-none outline-none text-base py-3"
                placeholder="Ask Fusion to build..."
                type="text"
              />
              <button className="ml-2 px-3 py-1.5 bg-[#23244a] text-white rounded border border-[#23244a] hover:bg-[#2d2e5a] text-sm font-medium transition">+ Attach</button>
              <button className="ml-2 p-2 rounded bg-[#b6a6f7] hover:bg-[#a18be6] transition">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M3.5 10h13m0 0l-5-5m5 5l-5 5" stroke="#18192a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

HeroUnit.schema = {
  name: blockNames.HeroUnit,
  label: 'Centered Hero',
  category: 'hero sections',
  tags: ['hero unit', 'title'],
  playgroundLinkLabel: 'View source code on Github',
  playgroundLinkUrl:
    'https://github.com/ReactBricks/react-bricks-ui/blob/master/src/website/Hero%20Unit/HeroUnit.tsx',
  previewImageUrl: `/bricks-preview-images/${blockNames.HeroUnit}.png`,
  getDefaultProps: () => ({
    ...sectionDefaults,
    size: 'large',
    paddingTop: '12',
    paddingBottom: '12',
    textGradient: gradients.NONE.value,
    highlightTextColor: highlightTextColors.PINK.value,
    title: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'We develop ',
          },
          {
            text: 'beautiful',
            highlight: true,
          },
          {
            text: ' web applications',
          },
        ],
      },
    ],
    text: "We are a hi-tech web development company committed to deliver great products on time. We love to understand our customers' needs and exceed expectations.",
    badge: [
      {
        text: 'high tech',
        badgeColor: highlightTextColors.SKY.value,
      },
    ],
    buttons: [
      {
        type: 'link',
        text: 'Get Started',
        href: '',
        isTargetBlank: false,
        buttonType: 'submit',
        buttonColor: buttonColors.SKY.value,
        variant: 'solid',
        padding: 'normal',
        simpleAnchorLink: false,
      },
      {
        type: 'link',
        text: 'Learn more',
        href: '',
        isTargetBlank: false,
        buttonType: 'submit',
        buttonColor: buttonColors.SKY.value,
        variant: 'outline',
        padding: 'normal',
        simpleAnchorLink: false,
      },
    ],
  }),
  repeaterItems: [
    {
      name: 'badge',
      itemType: blockNames.Badge,
      itemLabel: 'Badge',
      min: 0,
      max: 1,
    },
    {
      name: 'buttons',
      itemType: blockNames.Button,
      itemLabel: 'Button',
      min: 0,
      max: 2,
    },
  ],
  sideEditProps: [
    {
      groupName: 'Title',
      defaultOpen: true,
      props: [
        textGradientEditProps,
        {
          name: 'size',
          label: 'Title size',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Radio,
            options: [
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' },
            ],
          },
        },
        highlightTextEditProps,
      ],
    },
    backgroundWithImageBgSideGroup,
    paddingBordersSideGroup,
  ],
  stories: [
    {
      id: 'gradient-hero-unit',
      name: 'Gradient Hero Unit',
      previewImageUrl: `/bricks-preview-images/gradient-hero-unit.png`,
      showAsBrick: true,
      props: {
        ...sectionDefaults,
        size: 'large',
        paddingTop: '12',
        paddingBottom: '12',
        textGradient: gradients.DAWN.value,
        highlightTextColor: highlightTextColors.PINK.value,
        title: "Let's make content editing fun, again!",
        text: 'Gray forms are a thing of the past. Let your editors enjoy visual editing over your React components!',
        buttons: [
          {
            type: 'link',
            text: 'Start now!',
            href: '',
            isTargetBlank: false,
            buttonType: 'submit',
            buttonColor: buttonColors.VIOLET.value,
            variant: 'solid',
            padding: 'normal',
            simpleAnchorLink: false,
          },
          {
            type: 'link',
            text: 'Watch the video',
            href: '',
            isTargetBlank: false,
            buttonType: 'submit',
            buttonColor: buttonColors.VIOLET.value,
            variant: 'outline',
            padding: 'normal',
            simpleAnchorLink: false,
          },
        ],
        backgroundImage: {
          fallbackSrc:
            'https://images.reactbricks.com/original/b438575d-f0e2-4f5d-94a7-bb30fb238962.png',
          fallbackSrcSet:
            'https://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-1600.png 1600w,\nhttps://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-1200.png 1200w,\nhttps://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-800.png 800w,\nhttps://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-400.png 400w,\nhttps://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-200.png 200w',
          fallbackType: 'image/png',
          src: 'https://images.reactbricks.com/original/b438575d-f0e2-4f5d-94a7-bb30fb238962.webp',
          placeholderSrc:
            'https://images.reactbricks.com/placeholder/b438575d-f0e2-4f5d-94a7-bb30fb238962.jpg',
          srcSet:
            'https://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-1600.webp 1600w,\nhttps://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-1200.webp 1200w,\nhttps://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-800.webp 800w,\nhttps://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-400.webp 400w,\nhttps://images.reactbricks.com/src_set/b438575d-f0e2-4f5d-94a7-bb30fb238962-200.webp 200w',
          width: 2000,
          height: 1000,
          alt: 'backgroundImage',
          seoName: '',
        },
      },
    },
  ],
}

export default HeroUnit
