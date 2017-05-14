import React from 'react';
import Actions from './Actions';

const CssText = (props) => {
  var cssText;

  if(props.minify){
    cssText = <div className="css-text minified"><code>{props.children}</code></div>;
  } else{
    cssText = <pre className="css-text unminified"><code>{props.children}</code></pre>;
  }

  return (
      <section className="css-output ui-column">
        <header className="ui-column-header">
          <Actions
            downloadHandler={props.downloadHandler}
            shareHandler={props.shareHandler}
            copyHandler={props.copyHandler}
          />
          <h2>{props.preprocessor} <span className="accent-text">&nbsp;&mdash; {(new TextEncoder('utf-8').encode(props.styleSheetText)).length} bytes</span></h2>
        </header>
        {cssText}
      </section>
  );
}

export default CssText;
