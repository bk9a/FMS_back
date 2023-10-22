export const Text = (props) => {
  const Component = "div";
  return <Component className={props.className}>{props.children}</Component>;
};
