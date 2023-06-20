const supportSymbol = typeof Symbol !== 'undefined';

export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react_element')
	: 0;
