/*******************************************************************************
 * ATE, Automation Test Engine
 *
 * Copyright 2015, Montreal PROT, or individual contributors as
 * indicated by the @author tags or express copyright attribution
 * statements applied by the authors.  All third-party contributions are
 * distributed under license by Montreal PROT.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
package utils.form;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

// TODO: Auto-generated Javadoc
/**
 * This class FormElementCollector defines ....
 * 
 * @author Peidong Hu
 *
 */
abstract public class WebFormElementsCollector {
	
	/** The dom doc. */
	final private Document domDoc;
	
	/** The cleaned doc. */
	final private Document cleanedDoc;
	
	/** The parent frame. */
	private String xpathOfParentFrame;

	/**
	 * Instantiates a new web form elements collector.
	 *
	 * @param domDoc the dom doc
	 * @param parentFrame the parent frame, Nullable
	 * @throws ParserConfigurationException the parser configuration exception
	 */
	public WebFormElementsCollector(Document domDoc, String xpathOfParentFrame)
			throws ParserConfigurationException {
		this.domDoc = domDoc;
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

		DocumentBuilder builder = dbf.newDocumentBuilder();
		cleanedDoc = builder.newDocument();

		Node root = cleanedDoc.importNode(domDoc.getDocumentElement(), true);
		cleanedDoc.appendChild(root);
		fnCleanNode(cleanedDoc.getDocumentElement());
		this.xpathOfParentFrame = xpathOfParentFrame;
	}

	/**
	 * Fn clean node.
	 *
	 * @param node the node
	 */
	private void fnCleanNode(Node node) {
		int i = 0;
		NodeList cNodes = node.getChildNodes();
		Node t;
		while ((t = cNodes.item(i++)) != null)
			switch (t.getNodeType()) {
			case Node.ELEMENT_NODE: // Element Node
				if (!t.getNodeName().equalsIgnoreCase("br")) {
					fnCleanNode(t);
					break;
				} else  {
					node.removeChild(t);
					i--;
					break;
				}
			case Node.TEXT_NODE: // Text Node
				if (!t.getNodeValue().trim().equals(""))
					break;
				else {
					node.removeChild(t);
					i--;
					break;
				}
			case Node.COMMENT_NODE: // Comment Node (and Text Node without non-whitespace
					// content)
				node.removeChild(t);
				i--;
			}
	}

	/**
	 * Gets the dom doc.
	 *
	 * @return the webDriver
	 */
	public Document getDomDoc() {
		return domDoc;
	}

	/**
	 * Gets the cleaned doc.
	 *
	 * @return the cleanedDoc
	 */
	public final Document getCleanedDoc() {
		return cleanedDoc;
	}
}
