import React from 'react';
import Actions from './Actions';

const CssText = (props) => {
  var cssText;

  if(props.minify){
    cssText = <div className="css-text minified"><code>{props.children}</code></div>;
  } else{
    cssText = <pre className="css-text"><code>{props.children}</code></pre>;
  }

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
        {cssText}
      </section>
  );
}

export default CssText;
