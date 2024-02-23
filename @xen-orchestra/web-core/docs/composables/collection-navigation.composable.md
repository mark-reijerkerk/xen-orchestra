# `useCollectionNavigation`

The `useCollectionNavigation` composable handles the navigation across a collection (i.e., changing the active item).

It is mainly used to navigate between items in a collection with a keyboard.

## Usage

```ts
const definition = defineCollection(/* ... */)

const { items, activeItem } = useCollection(definitions)

const { moveUp, moveDown, moveLeft, moveRight, handleKeydown } = useCollectionNavigation(items, activeItem)
```

## `moveUp`

The `moveUp` function set the `activeItem` to the previous one, if any, or `undefined` otherwise.

If the previous item is a `Group` and it is expanded, the `moveUp` function will set the `activeItem` to the last item
of that group.

## `moveDown`

The `moveDown` function set the `activeItem` to the next one, if any, or `undefined` otherwise.

If the current `activeItem` is a `Group` and it is expanded, the `moveDown` function will set the `activeItem` to the
first item of that group.

## `moveLeft`

If the current `activeItem` is a `Group` and it is expanded, the `moveLeft` function will collapse the group.

In any other case, the `moveLeft` function will set the `activeItem` to the parent `Group`, if any, or will do nothing
otherwise.

## `moveRight`

If the current `activeItem` is a `Group` and it is collapsed, the `moveRight` function will expand the group.

In any other case, the `moveRight` function will act the same as `moveDown`.

## `handleKeydown`

The `handleKeydown` function is a helper function that can be used with the `@keydown` event binding.

```html
<div @keydown="handleKeydown" tabindex="0">...</div>

<!-- Is equivalent to -->
<div
  @keydown.left.prevent="moveLeft"
  @keydown.right.prevent="moveRight"
  @keydown.up.prevent="moveUp"
  @keydown.down.prevent="moveDown"
  tabindex="0"
>
  ...
</div>
```
