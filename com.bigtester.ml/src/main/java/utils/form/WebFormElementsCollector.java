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
	final private Document domDoc;
	final private Document cleanedDoc;

	public WebFormElementsCollector(Document domDoc)
			throws ParserConfigurationException {
		this.domDoc = domDoc;
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

		DocumentBuilder builder = dbf.newDocumentBuilder();
		cleanedDoc = builder.newDocument();

		Node root = cleanedDoc.importNode(domDoc.getDocumentElement(), true);
		cleanedDoc.appendChild(root);
		fnCleanNode(cleanedDoc.getDocumentElement());
//		NodeList allNodes = domDoc.getChildNodes();
//		for (int i = 0; i < allNodes.getLength(); i++) {
//			Node t = allNodes.item(i);
//			switch (t.getNodeType()) {
//			case Node.ELEMENT_NODE: // Element Node
//				fnCleanNode(t);
//				break;
//			case Node.TEXT_NODE: // Text Node
//				if (!t.getNodeValue().trim().equals(""))
//					break;
//			case 8: // Comment Node (and Text Node without non-whitespace
//					// content)
//				domDoc.removeChild(t);
//				i--;
//			}
//		}
	}

	private void fnCleanNode(Node node) {
		int i = 0;
		NodeList cNodes = node.getChildNodes();
		Node t;
		while ((t = cNodes.item(i++)) != null)
			switch (t.getNodeType()) {
			case Node.ELEMENT_NODE: // Element Node
				fnCleanNode(t);
				break;
			case Node.TEXT_NODE: // Text Node
				if (!t.getNodeValue().trim().equals(""))
					break;
			case 8: // Comment Node (and Text Node without non-whitespace
					// content)
				node.removeChild(t);
				i--;
			}
	}

	/**
	 * @return the webDriver
	 */
	public Document getDomDoc() {
		return domDoc;
	}

	/**
	 * @return the cleanedDoc
	 */
	public final Document getCleanedDoc() {
		return cleanedDoc;
	}
}
