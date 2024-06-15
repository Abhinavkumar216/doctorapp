export interface OnboardingItem {
  id: number;
  Image: any; // You can replace 'any' with the specific type if you know it (e.g., ImageSourcePropType for react-native images)
  title: string;
  subtitle: string;
}

export const Onboardingdata: OnboardingItem[] = [
  {
    id: 1,
    Image: require("@assets/images/StockImage/image1.png"),
    title: "Meet Doctors Online",
    subtitle:
      "Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations.",
  },
  {
    id: 2,
    Image: require("@assets/images/StockImage/image19.png"),
    title: "Connect with Specialists",
    subtitle:
      "Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations.",
  },
  {
    id: 3,
    Image: require("@assets/images/StockImage/image12.png"),
    title: "Thousands of Online Specialists",
    subtitle:
      "Explore a Vast Array of Online Medical Specialists, Offering an Extensive Range of Expertise Tailored to Your Healthcare Needs.",
  },
];
