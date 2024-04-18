
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
    name: 'theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
        "--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "0px",
        "--theme-rounded-container": "0px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "0 0 0",
        "--on-secondary": "255 255 255",
        "--on-tertiary": "0 0 0",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #e64245
        "--color-primary-50": "251 227 227", // #fbe3e3
        "--color-primary-100": "250 217 218", // #fad9da
        "--color-primary-200": "249 208 209", // #f9d0d1
        "--color-primary-300": "245 179 181", // #f5b3b5
        "--color-primary-400": "238 123 125", // #ee7b7d
        "--color-primary-500": "230 66 69", // #e64245
        "--color-primary-600": "207 59 62", // #cf3b3e
        "--color-primary-700": "173 50 52", // #ad3234
        "--color-primary-800": "138 40 41", // #8a2829
        "--color-primary-900": "113 32 34", // #712022
        // secondary | #832022
        "--color-secondary-50": "236 222 222", // #ecdede
        "--color-secondary-100": "230 210 211", // #e6d2d3
        "--color-secondary-200": "224 199 200", // #e0c7c8
        "--color-secondary-300": "205 166 167", // #cda6a7
        "--color-secondary-400": "168 99 100", // #a86364
        "--color-secondary-500": "131 32 34", // #832022
        "--color-secondary-600": "118 29 31", // #761d1f
        "--color-secondary-700": "98 24 26", // #62181a
        "--color-secondary-800": "79 19 20", // #4f1314
        "--color-secondary-900": "64 16 17", // #401011
        // tertiary | #43e5e5
        "--color-tertiary-50": "227 251 251", // #e3fbfb
        "--color-tertiary-100": "217 250 250", // #d9fafa
        "--color-tertiary-200": "208 249 249", // #d0f9f9
        "--color-tertiary-300": "180 245 245", // #b4f5f5
        "--color-tertiary-400": "123 237 237", // #7beded
        "--color-tertiary-500": "67 229 229", // #43e5e5
        "--color-tertiary-600": "60 206 206", // #3ccece
        "--color-tertiary-700": "50 172 172", // #32acac
        "--color-tertiary-800": "40 137 137", // #288989
        "--color-tertiary-900": "33 112 112", // #217070
        // success | #00ff40
        "--color-success-50": "217 255 226", // #d9ffe2
        "--color-success-100": "204 255 217", // #ccffd9
        "--color-success-200": "191 255 207", // #bfffcf
        "--color-success-300": "153 255 179", // #99ffb3
        "--color-success-400": "77 255 121", // #4dff79
        "--color-success-500": "0 255 64", // #00ff40
        "--color-success-600": "0 230 58", // #00e63a
        "--color-success-700": "0 191 48", // #00bf30
        "--color-success-800": "0 153 38", // #009926
        "--color-success-900": "0 125 31", // #007d1f
        // warning | #EAB308
        "--color-warning-50": "252 244 218", // #fcf4da
        "--color-warning-100": "251 240 206", // #fbf0ce
        "--color-warning-200": "250 236 193", // #faecc1
        "--color-warning-300": "247 225 156", // #f7e19c
        "--color-warning-400": "240 202 82", // #f0ca52
        "--color-warning-500": "234 179 8", // #EAB308
        "--color-warning-600": "211 161 7", // #d3a107
        "--color-warning-700": "176 134 6", // #b08606
        "--color-warning-800": "140 107 5", // #8c6b05
        "--color-warning-900": "115 88 4", // #735804
        // error | #d21919
        "--color-error-50": "248 221 221", // #f8dddd
        "--color-error-100": "246 209 209", // #f6d1d1
        "--color-error-200": "244 198 198", // #f4c6c6
        "--color-error-300": "237 163 163", // #eda3a3
        "--color-error-400": "224 94 94", // #e05e5e
        "--color-error-500": "210 25 25", // #d21919
        "--color-error-600": "189 23 23", // #bd1717
        "--color-error-700": "158 19 19", // #9e1313
        "--color-error-800": "126 15 15", // #7e0f0f
        "--color-error-900": "103 12 12", // #670c0c
        // surface | #16171C
        "--color-surface-50": "220 220 221", // #dcdcdd
        "--color-surface-100": "208 209 210", // #d0d1d2
        "--color-surface-200": "197 197 198", // #c5c5c6
        "--color-surface-300": "162 162 164", // #a2a2a4
        "--color-surface-400": "92 93 96", // #5c5d60
        "--color-surface-500": "22 23 28", // #16171C
        "--color-surface-600": "20 21 25", // #141519
        "--color-surface-700": "17 17 21", // #111115
        "--color-surface-800": "13 14 17", // #0d0e11
        "--color-surface-900": "11 11 14", // #0b0b0e

    }
}