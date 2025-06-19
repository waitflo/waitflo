import { Image, RichText, Text, types } from 'react-bricks/rsc'

//=============================
// Local Types
//=============================
type Padding = 'big' | 'small'

interface HeroUnitProps {
  padding: Padding
  title: types.TextValue
  text: types.TextValue
  icon: types.IImageSource
}

//=============================
// Component to be rendered
//=============================
const MyHeroUnit: types.Brick<HeroUnitProps> = ({
  padding,
  icon,
  title,
  text,
}) => {
  return (
    <div className="dark:bg-gray-900">
      <div
        className={`max-w-xl mx-auto px-6 ${
          padding === 'big' ? 'py-20' : 'py-12'
        }`}
      >
        <Image
          propName="icon"
          source={icon}
          alt="Icon"
          maxWidth={80}
          aspectRatio={1}
          imageClassName="w-20 mb-5 mx-auto"
        />
        <Text
          propName="title"
          value={title}
          renderBlock={(props) => (
            <h1 className="text-3xl sm:text-4xl text-center font-extrabold text-gray-900 dark:text-white leading-tight mb-3">
              {props.children}
            </h1>
          )}
          renderPlaceholder={(props) => (
            <span className="opacity-30">{props.children}</span>
          )}
          placeholder="Type a title..."
        />
        <RichText
          propName="text"
          value={text}
          renderBlock={(props) => (
            <p className="text-xl text-center leading-relaxed text-gray-700 dark:text-gray-100">
              {props.children}
            </p>
          )}
          placeholder="Type a text..."
          allowedFeatures={[
            types.RichTextFeatures.Bold,
            types.RichTextFeatures.Italic,
            types.RichTextFeatures.Highlight,
            types.RichTextFeatures.Code,
            types.RichTextFeatures.Link,
          ]}
          renderCode={(props) => (
            <code className="text-sm py-1 px-2 bg-gray-200 dark:bg-gray-700 rounded-sm">
              {props.children}
            </code>
          )}
          renderLink={(props) => (
            <a
              href={props.href}
              target={props.target}
              rel={props.rel}
              className="text-sky-500 hover:text-sky-600 transition-colors"
            >
              {props.children}
            </a>
          )}
        />
      </div>
    </div>
  )
}

//=============================
// Brick Schema
//=============================
MyHeroUnit.schema = {
  name: 'my-hero-unit',
  label: 'Custom Hero Unit',
  previewImageUrl: `/bricks-preview-images/custom-hero-unit.png`,
  getDefaultProps: () => ({
    padding: 'big',
    title: 'This is a custom Hero Unit',
    text: "We are a hi-tech web development company committed to deliver great products on time. We love to understand our customers' needs and exceed expectations.",
  }),
  sideEditProps: [
    {
      name: 'padding',
      label: 'Padding',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { value: 'big', label: 'Big Padding' },
          { value: 'small', label: 'Small Padding' },
        ],
      },
    },
  ],
}

export default MyHeroUnit
