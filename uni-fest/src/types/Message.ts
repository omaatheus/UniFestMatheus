export default interface Message {
  image?: string;
  title: string;
  description: string;
  action?: () => void;
}
