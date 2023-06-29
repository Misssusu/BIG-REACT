import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElement,
	ElementType
} from 'shared/ReactTypes';

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'SuYuan'
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = undefined;
	const props: Props = {};
	let ref: Ref = undefined;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key' && val !== undefined) {
			key = '' + val;
			continue;
		}
		if (prop === 'ref' && val !== undefined) {
			ref = '' + val;
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			//判断prop是不是config自带的属性即不是继承的
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		//child [child, child, child]
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = undefined;
	const props: Props = {};
	let ref: Ref = undefined;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key' && val !== undefined) {
			key = '' + val;
			continue;
		}
		if (prop === 'ref' && val !== undefined) {
			ref = '' + val;
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			//判断prop是不是config自带的属性即不是继承的
			props[prop] = val;
		}
	}

	return ReactElement(type, key, ref, props);
};
