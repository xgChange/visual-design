export enum COMPONENT_GROUP_TYPE {
  BASIC = 'BASIC'
}

export enum PANEL_GROUP_TYPE {
  COMPONENT = 'component',
  PAGESETTING = 'page_setting'
}

export enum COMPONENT_NAME_ENUM {
  BUTTON = 'Button',
  IMAGE = 'Image'
}

export const panelGroupName = {
  [PANEL_GROUP_TYPE.COMPONENT]: '基础组件',
  [PANEL_GROUP_TYPE.PAGESETTING]: '页面设置'
}

export const componentName = {
  [COMPONENT_NAME_ENUM.BUTTON]: '按钮',
  [COMPONENT_NAME_ENUM.IMAGE]: '图片'
}
