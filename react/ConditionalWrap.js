// Source: https://gist.github.com/kitze/23d82bb9eb0baabfd03a6a720b1d637f
/**
 * Example:
 *    <ConditionalWrap
 *     condition={shouldLink}
 *     wrap={children => <a href="/">{children}</a>}
 *   >
 *     <img src="image.png"/>
 *   </ConditionalWrap>
 */
export const ConditionalWrap = ({condition, wrap, children}) => (condition ? wrap(children) : children);
