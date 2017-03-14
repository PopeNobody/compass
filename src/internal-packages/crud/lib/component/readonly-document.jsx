const React = require('react');
const HadronDocument = require('hadron-document');
const Element = require('./element');

/**
 * The arrow up class.
 */
const ARROW_UP = 'fa fa-arrow-circle-up';

/**
 * The arrow down class.
 */
const ARROW_DOWN = 'fa fa-arrow-circle-down';

/**
 * The base class.
 */
const BASE = 'document';

/**
 * The elements class.
 */
const ELEMENTS = `${BASE}-elements`;

/**
 * The field limit.
 */
const FIELD_LIMIT = 30;

/**
 * The expander class.
 */
const EXPANDER = 'document document-expander';

/**
 * The test id.
 */
const TEST_ID = 'readonly-document';

/**
 * Component for a single readonly document in a list of documents.
 */
class ReadonlyDocument extends React.Component {

  /**
   * Initialize the readonly document.
   *
   * @param {Object} props - The properties.
   */
  constructor(props) {
    super(props);
    this.doc = new HadronDocument(props.doc);
    this.state = { expanded: false };
  }

  /**
   * Handle clicking the expand button.
   */
  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  /**
   * Get the elements for the document.
   *
   * @returns {Array} The elements.
   */
  renderElements() {
    const components = [];
    let index = 0;
    for (const element of this.doc.elements) {
      components.push((
        <Element
          key={element.uuid}
          element={element}
          expandAll={this.props.expandAll}
          rootFieldIndex={this.state.expanded ? 0 : index} />
      ));
      index++;
    }
    return components;
  }

  /**
   * Render the expander bar.
   *
   * @returns {React.Component} The expander bar.
   */
  renderExpansion() {
    if (this.doc.elements.size >= FIELD_LIMIT) {
      return (
        <div className={EXPANDER} onClick={this.handleExpandClick.bind(this)}>
          <i className={this.renderIconStyle()} aria-hidden="true"></i>
          <span>{this.renderExpansionText()}</span>
        </div>
      );
    }
  }

  /**
   * Render the expansion text.
   *
   * @returns {String} The text.
   */
  renderExpansionText() {
    const extraFields = this.doc.elements.size - FIELD_LIMIT;
    if (this.state.expanded) {
      return `Show ${extraFields} less fields`;
    }
    return `Show ${extraFields} more fields`;
  }

  /**
   * Render the style for the expansion icon.
   *
   * @returns {String} The style.
   */
  renderIconStyle() {
    return this.state.expanded ? ARROW_UP : ARROW_DOWN;
  }

  /**
   * Render a single document list item.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <div className={BASE} data-test-id={TEST_ID}>
        <ol className={ELEMENTS}>
          {this.renderElements()}
        </ol>
        {this.renderExpansion()}
      </div>
    );
  }
}

ReadonlyDocument.displayName = 'ReadonlyDocument';

ReadonlyDocument.propTypes = {
  doc: React.PropTypes.object.isRequired,
  expandAll: React.PropTypes.bool
};

module.exports = ReadonlyDocument;
