type WidgetStyles = {
  color: string;
  backgroundColor: string;
};

export type WidgetItem = {
  innerText: string;
  visible: boolean;
  styles: WidgetStyles;
};

type BaseWidgetQuestion = {
  label: string;
  placeholder: string;
  isRequired: boolean;
  styles: WidgetStyles;
};

type TextWidgetQuestion = BaseWidgetQuestion & {
  type: "TEXT";
};

export type WidgetQuestion = {
  label: string;
  placeholder: string;
  isRequired: boolean;
  styles: WidgetStyles;
} & (
  | { type: "TEXT" }
  | { type: "SELECT"; options: string[] }
  | { type: "DATE"; start: Date; end: Date; default: Date }
  | { type: "RADIO"; options: string[] }
  | { type: "CHECKBOX"; options: string[] }
);

export type WidgetSocialMediaOption = {
  enabled: boolean;
  link: string;
};

export type WidgetContent = {
  title: WidgetItem;
  description: WidgetItem;
  successTitle: WidgetItem;
  successDescription: WidgetItem;
  signUpBtn: WidgetItem;
  questions: WidgetQuestion[];
  socialMedia: {
    OGTitle: string;
    OGDescription: string;
    OGImage: string;
    email: WidgetSocialMediaOption;
    x: WidgetSocialMediaOption;
    facebook: WidgetSocialMediaOption;
    instagram: WidgetSocialMediaOption;
    pintirest: WidgetSocialMediaOption;
  };
  styles: {
    color: string;
    backgroundColor: string;
  };
};
