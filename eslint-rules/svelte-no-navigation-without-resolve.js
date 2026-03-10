const EXTERNAL_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:'];

const INTERNAL_PATH_PREFIXES = ['/', './', '../'];

const MESSAGE_ID = 'internalHrefWithoutResolve';

const rule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Disallow internal <a> hrefs without resolve(), while allowing external schemes.',
			recommended: false
		},
		messages: {
			[MESSAGE_ID]: 'Unexpected internal href without resolve().'
		},
		schema: []
	},
	create(context) {
		function getTagName(node) {
			if (!node) return null;
			if (typeof node.name === 'string') return node.name;
			if (node.name && typeof node.name.name === 'string') return node.name.name;
			if (typeof node.tagName === 'string') return node.tagName;
			if (node.tagName && typeof node.tagName.name === 'string') return node.tagName.name;
			return null;
		}

		function getAttributeName(attr) {
			if (!attr) return null;
			if (attr.key && typeof attr.key.name === 'string') return attr.key.name;
			if (typeof attr.name === 'string') return attr.name;
			if (attr.name && typeof attr.name.name === 'string') return attr.name.name;
			return null;
		}

		function isAllowedExternalHref(value) {
			const lower = value.toLowerCase();
			if (lower.startsWith('#')) return true;
			if (lower.startsWith('//')) return true;
			return EXTERNAL_SCHEMES.some((scheme) => lower.startsWith(scheme));
		}

		function extractLiteralString(attr) {
			if (!attr || !Array.isArray(attr.value) || attr.value.length !== 1) return null;
			const valueNode = attr.value[0];

			if (!valueNode) return null;

			if (
				(valueNode.type === 'SvelteLiteral' || valueNode.type === 'Literal') &&
				typeof valueNode.value === 'string'
			) {
				return valueNode.value;
			}

			if (valueNode.type === 'SvelteMustacheTag' && valueNode.expression) {
				const expr = valueNode.expression;

				if (expr.type === 'Literal' && typeof expr.value === 'string') {
					return expr.value;
				}

				if (expr.type === 'TemplateLiteral' && expr.expressions.length === 0) {
					const quasi = expr.quasis[0];
					return quasi?.value?.cooked ?? quasi?.value?.raw ?? null;
				}
			}

			return null;
		}

		function isInternalPath(value) {
			return INTERNAL_PATH_PREFIXES.some((prefix) => value.startsWith(prefix));
		}

		function handleElement(node) {
			const tagName = getTagName(node);
			if (tagName !== 'a') return;

			const attributes = node.attributes || node.startTag?.attributes || [];
			const hrefAttr = attributes.find((attr) => {
				if (attr.type !== 'SvelteAttribute') return false;
				return getAttributeName(attr) === 'href';
			});

			if (!hrefAttr) return;

			const literalValue = extractLiteralString(hrefAttr);

			// Only enforce when the href is a static string literal.
			if (literalValue === null) return;

			if (isAllowedExternalHref(literalValue)) return;

			if (isInternalPath(literalValue)) {
				context.report({
					node: hrefAttr,
					messageId: MESSAGE_ID
				});
			}
		}

		return {
			SvelteHTMLElement: handleElement,
			SvelteElement: handleElement
		};
	}
};

export default {
	rules: {
		'no-navigation-without-resolve': rule
	}
};
