import React from 'react';
import Actions from './Actions';

const CssText = (props) => {
  return (
      <section className="css-output ui-column">
        <header className="ui-column-header">
          <Actions
            downloadHandler={props.downloadHandler}
            shareHandler={props.shareHandler}
            copyHandler={props.copyHandler}
          />
          <h2>{props.preprocessor} Output</h2>
        </header>
        <pre>
          <code>{props.children}</code>
        </pre>
      </section>
  );
}

export default CssText;
