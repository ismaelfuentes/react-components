# react-components

> Generic and reusable react components

## Install

```bash
yarn add --dev react-components
```

To use the example project you need to link the parent to the child:

1. do "yarn link" on the root folder.
2. move to folder ./example and do "yarn link react-components"
3. now in ./example do

```bash
yarn install
```

## Usage

Hay que importar una vez el fichero de estilos en el proyecto(Se puede hacer en el app.js o donde se quiera)

```tsx
import 'react-components/dist/styles.css'
```

## Hello world

```tsx
import * as React from 'react'

import 'react-components/dist/styles.css'
import { Button } from 'react-components'

class Example extends React.Component {
  render() {
    return <Button text="hola mundo" />
  }
}
```

## Modals

In order to use the modal component, the index.html must have this specific div (usually after the react root div)

```html
<div id="modal-root"></div>
```

## Update dependencies and link projects

**_We highly recommend to remove node_module first of all._**

#### If we update react versions, we need to link afterwards.

1. Then, move to the example project and link the example project to these libraries
   ```bash
    yarn link react-component
   ```
   If we want to ensure that we are using the right linked package in the terminal , go to your root project that will consume the package and write:
   ```bash
   ls -l node_modules/ | egrep "^l"
   ```
   you should see something similar to:
   ```
   ❯ ls -l node_modules/ | egrep "^l"
   lrwxr-xr-x   1 ismael  staff    55  8 Oct 13:12 react-components -> ../../../../../../.config/yarn/link/react-components
   ```
