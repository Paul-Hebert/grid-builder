import React from 'react';
import PropTypes from 'prop-types';
import Actions from './Actions';

const DisplayedCss = (props) => {
  var displayedCss;

  if(props.minify){
    displayedCss = <div className="css-text minified"><code>{props.children}</code></div>;
  } else{
    displayedCss = <pre className="css-text unminified"><code>{props.children}</code></pre>;
  }

  return (
      <section className="css-output ui-column">
        <header className="ui-column-header">
          <Actions
            downloadHandler={props.downloadHandler}
            shareHandler={props.shareHandler}
            copyHandler={props.copyHandler}
          />
          <h2>{props.preprocessor} <span className="accent-text"> <span className="muted"> | </span>  {props.fileSize} bytes</span></h2>
        </header>
        {displayedCss}
      </section>
  );
}

DisplayedCss.PropTypes = {
  preprocessor: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  downloadHandler: PropTypes.func.isRequired,
  shareHandler: PropTypes.func.isRequired,
  copyHandler: PropTypes.func.isRequired
}

export default DisplayedCss;
