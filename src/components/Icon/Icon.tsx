export type IconNames =
  | "send"
  | "lightning bolt"
  | "sun"
  | "warning"
  | "close"
  | "listMenu";
export type IconSizes = "small" | "medium";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size: IconSizes;
  name: IconNames;
}

type RawIconProps = Omit<IconProps, "name">;

function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case "send":
      return <SendIcon {...props} />;

    case "lightning bolt":
      return <LightningBolt {...props} />;

    case "sun":
      return <Sun {...props} />;

    case "warning":
      return <Warning {...props} />;

    case "close":
      return <Close {...props} />;

    case "listMenu":
      return <ListMenu {...props} />;

    default:
      throw new Error(`Icon with name "${name} not supported"`);
  }
}

function SendIcon({ size, ...props }: RawIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...mapSizeToEMDimensions(size)}
      {...props}
    >
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9"></polygon>
    </svg>
  );
}

function ListMenu({ size, ...props }: RawIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...mapSizeToEMDimensions(size)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M3 18h18v-2H3v2zM3 13h18v-2H3v2zM3 6v2h18V6H3z"
      />
    </svg>
  );
}

function LightningBolt({ size, ...props }: RawIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
      {...mapSizeToEMDimensions(size)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      ></path>
    </svg>
  );
}

function Sun({ size, ...props }: RawIconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...mapSizeToEMDimensions(size)}
      {...props}
    >
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );
}

function Warning({ size, ...props }: RawIconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...mapSizeToEMDimensions(size)}
      {...props}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}

function Close({ size, ...props }: RawIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...mapSizeToEMDimensions(size)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M18.36 6.34a1 1 0 0 0-1.42 0L12 10.59 7.76 6.34a1 1 0 0 0-1.42 1.42L10.59 12l-4.25 4.24a1 1 0 1 0 1.42 1.42L12 13.41l4.24 4.25a1 1 0 0 0 1.42-1.42L13.41 12l4.25-4.24a1 1 0 0 0 0-1.42z"
      />
    </svg>
  );
}

function mapSizeToEMDimensions(size: IconSizes): {
  width: string;
  height: string;
} {
  switch (size) {
    case "small":
      return { width: "1.2em", height: "1.2em" };

    case "medium":
      return { width: "2em", height: "3em" };

    default:
      throw new Error(`Size "${size} not recognized"`);
  }
}

export { Icon };
