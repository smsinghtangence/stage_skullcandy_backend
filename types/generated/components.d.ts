import type { Schema, Attribute } from '@strapi/strapi';

export interface ActivityActivity extends Schema.Component {
  collectionName: 'components_activity_activities';
  info: {
    displayName: 'Activity';
    description: '';
  };
  attributes: {
    All_Day_Listening: Attribute.Boolean & Attribute.DefaultTo<false>;
    At_the_Gym: Attribute.Boolean & Attribute.DefaultTo<false>;
    Focus: Attribute.Boolean & Attribute.DefaultTo<false>;
    Travel: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface BackgroundTypeBackgroundType extends Schema.Component {
  collectionName: 'components_background_type_background_types';
  info: {
    displayName: 'Background_Type';
  };
  attributes: {};
}

export interface BatteryLifeBatteryLife extends Schema.Component {
  collectionName: 'components_battery_life_battery_lives';
  info: {
    displayName: 'Battery_Life';
    description: '';
  };
  attributes: {
    Hours: Attribute.Integer & Attribute.DefaultTo<0>;
  };
}

export interface BillingBilling extends Schema.Component {
  collectionName: 'components_billing_billings';
  info: {
    displayName: 'Billing';
  };
  attributes: {
    first_name: Attribute.String;
    last_name: Attribute.String;
    address_1: Attribute.Text;
    address_2: Attribute.Text;
    city: Attribute.String;
    state: Attribute.String;
    postcode: Attribute.BigInteger;
    country: Attribute.String;
    phone: Attribute.BigInteger;
  };
}

export interface BillingShipping extends Schema.Component {
  collectionName: 'components_billing_shippings';
  info: {
    displayName: 'shipping';
  };
  attributes: {};
}

export interface CollectionsHomeCollection extends Schema.Component {
  collectionName: 'components_collections_home_collections';
  info: {
    displayName: 'HomeCollection';
    description: '';
  };
  attributes: {
    Heading: Attribute.String;
    url: Attribute.String;
    CollectionImg: Attribute.Media;
  };
}

export interface ColorBoxColorBox extends Schema.Component {
  collectionName: 'components_color_box_color_boxes';
  info: {
    displayName: 'Color_Box';
    description: '';
  };
  attributes: {
    Button_Name: Attribute.String;
    Button_Link: Attribute.String;
    Background_Image: Attribute.Media;
    Heading_Icon: Attribute.Media;
    Heading: Attribute.String;
    Content: Attribute.Text;
  };
}

export interface ContentSectionContentSection extends Schema.Component {
  collectionName: 'components_content_section_content_sections';
  info: {
    displayName: 'Content_Section';
    description: '';
  };
  attributes: {
    Desktop_Image: Attribute.Media;
    Tab_Image: Attribute.Media;
    Content_Alignment: Attribute.Enumeration<
      [
        'Left Align',
        'Right Align',
        'Right Top Content',
        'Left Top Content',
        'Both'
      ]
    >;
    Content_Heading: Attribute.String;
    Color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    Content_Description: Attribute.Text;
    Add_Button: Attribute.Enumeration<['Yes', 'No']>;
    Button_Type: Attribute.Enumeration<['Link', 'Popup', 'New Popup']>;
    Button_Name: Attribute.String;
    Button_Link: Attribute.String;
  };
}

export interface ExtraTechSpecsExtraFeatures extends Schema.Component {
  collectionName: 'components_extra_features_extra_features';
  info: {
    displayName: ' Extra_Tech_Specs';
    description: '';
  };
  attributes: {
    Heading: Attribute.String;
    Content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
  };
}

export interface FeatureListFeatureList extends Schema.Component {
  collectionName: 'components_feature_list_feature_lists';
  info: {
    displayName: 'Feature List';
    icon: 'bulletList';
  };
  attributes: {
    Heading: Attribute.String;
    Icons: Attribute.Media;
  };
}

export interface FeaturesContentFeaturesContent extends Schema.Component {
  collectionName: 'components_features_content_features_contents';
  info: {
    displayName: 'Features_Content';
  };
  attributes: {
    Icon_Image: Attribute.Media;
    Icon_Title: Attribute.String;
    Icon_Image_Vertical: Attribute.Media;
    Feature_Title_Vertical: Attribute.String;
    Feature_Desp_Vertical: Attribute.Text;
  };
}

export interface FeaturesFeatures extends Schema.Component {
  collectionName: 'components_features_features';
  info: {
    displayName: 'Features';
    description: '';
  };
  attributes: {
    Adjustable_Sensory_Bass: Attribute.Boolean & Attribute.DefaultTo<false>;
    Active_Noise_Canceling: Attribute.Boolean & Attribute.DefaultTo<false>;
    Multipoint_Pairing: Attribute.Boolean & Attribute.DefaultTo<false>;
    Stay_Aware: Attribute.Boolean & Attribute.DefaultTo<false>;
    Personal_Sound: Attribute.Boolean & Attribute.DefaultTo<false>;
    Custom_Equalizer: Attribute.Boolean & Attribute.DefaultTo<false>;
    Mobile_Skullcandy_App_Compatible: Attribute.Boolean &
      Attribute.DefaultTo<false>;
  };
}

export interface FilterCollectionsFilterCollections extends Schema.Component {
  collectionName: 'components_filter_collections_filter_collections';
  info: {
    displayName: 'Filter_Collections';
  };
  attributes: {
    Burton_x_Skullcandy: Attribute.Boolean;
  };
}

export interface FilterColorFilterColor extends Schema.Component {
  collectionName: 'components_filter_color_filter_colors';
  info: {
    displayName: 'Filter_Color';
    description: '';
  };
  attributes: {
    Color: Attribute.Enumeration<
      [
        'Black',
        'BlackCharcoal',
        'Black/Orange',
        'BleachedBlue',
        'Blue',
        'Blue/Sunset',
        'CherryRed',
        'ChillGrey',
        'CobaltBlue',
        'CuriousBlue',
        'DarkBlue/Green',
        'DARKGRAY',
        'DarkGray/Blue',
        'DarkGrey/Blue',
        'DeepRed',
        'ElectricYellow',
        'Elevatedolive',
        'FadedPink',
        'FadedPurple',
        'FreshMint',
        'Glacier',
        'GoldenAgeRed',
        'GoldenOrange',
        'GrayMiami',
        'GraySwirlBlack',
        'Gray/Miami',
        'Grey/Tan',
        'HotLime',
        'LightGrey/Blue',
        'Matcha',
        'MobWhite',
        'NaughtyNature',
        'Ooze',
        'Orange/Black',
        'P-STATIONWired',
        'Pink',
        'PureMint',
        'Purple',
        'RedBlack',
        'RedBurgundy',
        'RetroPurple',
        'RoyalNavy',
        'TrueBlack',
        'Bone',
        'White',
        'WhiteBlack',
        'WhiteGray',
        'White/Crimson',
        'XBOXGamingWired'
      ]
    >;
  };
}

export interface FiltersFilters extends Schema.Component {
  collectionName: 'components_filters_filters';
  info: {
    displayName: 'Filters';
    description: '';
  };
  attributes: {
    Filter_color: Attribute.Component<'filter-color.filter-color', true>;
    Activity_Filter: Attribute.Component<'activity.activity'>;
    Battery_Life: Attribute.Component<'battery-life.battery-life'>;
    Feature: Attribute.Component<'features.features'>;
    Filter_Collection: Attribute.Component<'filter-collections.filter-collections'>;
    ProductType: Attribute.Component<'product-type.product-type'>;
  };
}

export interface HomeadsHomeAds extends Schema.Component {
  collectionName: 'components_homeads_home_ads';
  info: {
    displayName: 'HomeAds';
    description: '';
  };
  attributes: {
    Heading: Attribute.String;
    ButtonText: Attribute.String;
    url: Attribute.String;
    AdsImg: Attribute.Media;
  };
}

export interface LeftImageContentLeftImageContent extends Schema.Component {
  collectionName: 'components_left_image_content_left_image_contents';
  info: {
    displayName: 'Left_Image_Content';
  };
  attributes: {
    Desktop_Image: Attribute.Media;
    Tab_Image: Attribute.Media;
    Image_Icon: Attribute.Media;
    Content: Attribute.Text;
  };
}

export interface LeftRightImageSectionLeftRightImageSection
  extends Schema.Component {
  collectionName: 'components_left_right_image_section_left_right_image_sections';
  info: {
    displayName: 'Left_Right_Image_Section';
  };
  attributes: {
    Left_Image: Attribute.Media;
    Right_Image: Attribute.Media;
    Left_Image_Tab: Attribute.Media;
    Right_Image_Tab: Attribute.Media;
  };
}

export interface LineItemsLineItems extends Schema.Component {
  collectionName: 'components_line_items_line_items';
  info: {
    displayName: 'line_items';
    description: '';
  };
  attributes: {
    product_id: Attribute.Integer;
    quantity: Attribute.Integer;
  };
}

export interface LogoBackgroundContentLogoBackgroundContent
  extends Schema.Component {
  collectionName: 'components_logo_background_content_logo_background_contents';
  info: {
    displayName: 'Logo_Background_content';
    description: '';
  };
  attributes: {
    Section_Bg_Color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    Skull_Logo: Attribute.Media;
    Quotes_Hash_Tag_Sign: Attribute.Media;
    Quotes_Content: Attribute.Text;
    Section_Visibility: Attribute.Boolean;
  };
}

export interface PressReleasePressReleases extends Schema.Component {
  collectionName: 'components_press_release_press_releases';
  info: {
    displayName: 'Press Releases';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    Date: Attribute.Date;
    Pdf: Attribute.Media;
  };
}

export interface ProductAccordionProductAccordion extends Schema.Component {
  collectionName: 'components_product_accordion_product_accordions';
  info: {
    displayName: 'Product_Accordion';
    description: '';
  };
  attributes: {
    Accordion_Heading: Attribute.String;
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
  };
}

export interface ProductDetailSlider2ProductDetailSlider2
  extends Schema.Component {
  collectionName: 'components_product_detail_slider_2_product_detail_slider_2s';
  info: {
    displayName: 'Product_Detail_Slider_2';
    description: '';
  };
  attributes: {
    Heading: Attribute.String;
    Description: Attribute.String;
    Image: Attribute.Media;
  };
}

export interface ProductDetailSliderProductDetailSlider
  extends Schema.Component {
  collectionName: 'components_product_detail_slider_product_detail_sliders';
  info: {
    displayName: 'Product_Detail_Slider';
  };
  attributes: {
    Heading: Attribute.String;
    Description: Attribute.String;
    Image: Attribute.Media;
  };
}

export interface ProductListCategoryProductListCategory
  extends Schema.Component {
  collectionName: 'components_product_list_category_product_list_categories';
  info: {
    displayName: 'Product List Category';
  };
  attributes: {
    Heading: Attribute.String;
    Url: Attribute.String;
    Image: Attribute.Media;
  };
}

export interface ProductSliderProductSlider extends Schema.Component {
  collectionName: 'components_product_slider_product_sliders';
  info: {
    displayName: 'Product_Slider';
    description: '';
  };
  attributes: {
    Product_Slider: Attribute.Media;
  };
}

export interface ProductTypeProductType extends Schema.Component {
  collectionName: 'components_product_type_product_types';
  info: {
    displayName: 'ProductType';
  };
  attributes: {
    Type: Attribute.Enumeration<
      ['Headphones', 'Neckbands', 'TWS', 'Accessories']
    >;
  };
}

export interface ProductUspProductUsp extends Schema.Component {
  collectionName: 'components_product_usp_product_usps';
  info: {
    displayName: 'product-usp';
    description: '';
  };
  attributes: {
    Heading: Attribute.String;
    Icon: Attribute.Media;
  };
}

export interface ProductVideoSectionProductVideoSection
  extends Schema.Component {
  collectionName: 'components_product_video_section_product_video_sections';
  info: {
    displayName: 'Product_Video_Section';
    description: '';
  };
  attributes: {
    image1: Attribute.Media;
    video1: Attribute.Media;
    image2: Attribute.Media;
    video2: Attribute.Media;
    video3: Attribute.Media;
    image3: Attribute.Media;
    image4: Attribute.Media;
    video4: Attribute.Media;
    image5: Attribute.Media;
    video5: Attribute.Media;
  };
}

export interface VariationSlidersVariationSliders extends Schema.Component {
  collectionName: 'components_variation_sliders_variation_sliders';
  info: {
    displayName: 'Variation_Sliders';
    description: '';
  };
  attributes: {
    Desktop_Image: Attribute.Media;
    Mobile_Image: Attribute.Media;
    Variations_Price: Attribute.String;
    Variant_Image: Attribute.Media;
    sales_price: Attribute.String;
    Quantity: Attribute.Integer;
    Variations_Color_Name: Attribute.Enumeration<
      [
        'Black',
        'BlackCharcoal',
        'Black/Orange',
        'BleachedBlue',
        'Blue',
        'Blue/Sunset',
        'CherryRed',
        'ChillGrey',
        'CobaltBlue',
        'CuriousBlue',
        'DarkBlue/Green',
        'DARKGRAY',
        'DarkGray/Blue',
        'DarkGrey/Blue',
        'DeepRed',
        'ElectricYellow',
        'Elevatedolive',
        'FadedPink',
        'FadedPurple',
        'FreshMint',
        'Glacier',
        'GoldenAgeRed',
        'GoldenOrange',
        'GrayMiami',
        'GraySwirlBlack',
        'Gray/Miami',
        'Grey/Tan',
        'HotLime',
        'LightGrey/Blue',
        'Matcha',
        'MobWhite',
        'NaughtyNature',
        'Ooze',
        'Orange/Black',
        'P-STATIONWired',
        'Pink',
        'PureMint',
        'Purple',
        'RedBlack',
        'RedBurgundy',
        'RetroPurple',
        'RoyalNavy',
        'TrueBlack',
        'Bone',
        'White',
        'WhiteBlack',
        'WhiteGray',
        'White/Crimson',
        'XBOXGamingWired'
      ]
    >;
    SKU: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 4;
      }>;
  };
}

export interface VideoSectionVideoSection extends Schema.Component {
  collectionName: 'components_video_section_video_sections';
  info: {
    displayName: 'Video_Section';
  };
  attributes: {
    Video_Desktop_Image: Attribute.Media;
    Video_Tab_Image: Attribute.Media;
    Video_YouTube_Id: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'activity.activity': ActivityActivity;
      'background-type.background-type': BackgroundTypeBackgroundType;
      'battery-life.battery-life': BatteryLifeBatteryLife;
      'billing.billing': BillingBilling;
      'billing.shipping': BillingShipping;
      'collections.home-collection': CollectionsHomeCollection;
      'color-box.color-box': ColorBoxColorBox;
      'content-section.content-section': ContentSectionContentSection;
      'extra-tech-specs.extra-features': ExtraTechSpecsExtraFeatures;
      'feature-list.feature-list': FeatureListFeatureList;
      'features-content.features-content': FeaturesContentFeaturesContent;
      'features.features': FeaturesFeatures;
      'filter-collections.filter-collections': FilterCollectionsFilterCollections;
      'filter-color.filter-color': FilterColorFilterColor;
      'filters.filters': FiltersFilters;
      'homeads.home-ads': HomeadsHomeAds;
      'left-image-content.left-image-content': LeftImageContentLeftImageContent;
      'left-right-image-section.left-right-image-section': LeftRightImageSectionLeftRightImageSection;
      'line-items.line-items': LineItemsLineItems;
      'logo-background-content.logo-background-content': LogoBackgroundContentLogoBackgroundContent;
      'press-release.press-releases': PressReleasePressReleases;
      'product-accordion.product-accordion': ProductAccordionProductAccordion;
      'product-detail-slider-2.product-detail-slider-2': ProductDetailSlider2ProductDetailSlider2;
      'product-detail-slider.product-detail-slider': ProductDetailSliderProductDetailSlider;
      'product-list-category.product-list-category': ProductListCategoryProductListCategory;
      'product-slider.product-slider': ProductSliderProductSlider;
      'product-type.product-type': ProductTypeProductType;
      'product-usp.product-usp': ProductUspProductUsp;
      'product-video-section.product-video-section': ProductVideoSectionProductVideoSection;
      'variation-sliders.variation-sliders': VariationSlidersVariationSliders;
      'video-section.video-section': VideoSectionVideoSection;
    }
  }
}
