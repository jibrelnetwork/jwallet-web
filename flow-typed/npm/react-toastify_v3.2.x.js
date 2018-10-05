// @flow

// flow-typed signature: ffc5839e0bfdf01a3d3146aaf277e8c5
// flow-typed version: 4430f7960f/react-toastify_v3.2.x/flow_>=v0.54.x

/* eslint-disable no-unused-vars, no-redeclare, eslint-comments/no-unused-disable,
  eslint-comments/disable-enable-pair, flowtype/no-types-missing-file-annotation,
  no-irregular-whitespace, quotes */

declare module "react-toastify" {
  declare type ToastType = "info" | "success" | "warning" | "error" | "default";

  declare type ToastContent = React$Node;

  declare type styleProps = {
    width?: string,
    colorDefault?: string,
    colorInfo?: string,
    colorSuccess?: string,
    colorWarning?: string,
    colorError?: string,
    colorProgressDefault?: string,
    mobile?: string,
    zIndex?: string | number,
    TOP_LEFT?: Object,
    TOP_CENTER?: Object,
    TOP_RIGHT?: Object,
    BOTTOM_LEFT?: Object,
    BOTTOM_CENTER?: Object,
    BOTTOM_RIGHT?: Object
  };

  declare type CommonOptions = {
    pauseOnHover?: boolean,
    closeOnClick?: boolean,
    autoClose?: number | false,
    position?: string,
    closeButton?: React$Node | false,
    progressClassName?: string | Object,
    className?: string | Object,
    bodyClassName?: string | Object,
    hideProgressBar?: boolean,
    transition?: any // TODO: Improve
  };

  declare type ToastOptions = CommonOptions & {
    onOpen?: () => void,
    onClose?: () => void,
    type?: ToastType
  };

  declare type UpdateOptions = ToastOptions & {
    render?: ToastContent
  };

  declare type ToastContainerProps = CommonOptions & {
    newestOnTop?: boolean,
    style?: Object,
    toastClassName?: string | Object
  };

  declare type Toast = {
    (content: ToastContent, options?: ToastOptions): number,
    success(content: ToastContent, options?: ToastOptions): number,
    info(content: ToastContent, options?: ToastOptions): number,
    warn(content: ToastContent, options?: ToastOptions): number,
    error(content: ToastContent, options?: ToastOptions): number,
    isActive(toastId: number): boolean,
    dismiss(toastId?: number): void,
    update(toastId: number, options?: UpdateOptions): number,

    TYPE: {
      INFO: ToastType,
      SUCCESS: ToastType,
      WARNING: ToastType,
      ERROR: ToastType,
      DEFAULT: ToastType
    },

    POSITION: {
      TOP_LEFT: string,
      TOP_RIGHT: string,
      TOP_CENTER: string,
      BOTTOM_LEFT: string,
      BOTTOM_RIGHT: string,
      BOTTOM_CENTER: string
    }
  };

  declare export class ToastContainer extends React$Component<ToastContainerProps> {}

  declare export function style(props: styleProps): void;

  declare export var toast: Toast;
}
