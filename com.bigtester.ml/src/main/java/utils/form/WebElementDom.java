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

import org.w3c.dom.Node;

// TODO: Auto-generated Javadoc
/**
 * This class WebElementDom defines ....
 * @author Peidong Hu
 *
 */
public class WebElementDom {
	private Node domNodePointer; //Selenium Dom node;
	private String xPath;
	

	WebElementDom(Node domPointer) {
		setDomNodePointer(domPointer);
	}
	/**
	 * @return the domNodePointer
	 */
	public Node getDomNodePointer() {
		return domNodePointer;
	}
	/**
	 * @param domNodePointer the domNodePointer to set
	 */
	public void setDomNodePointer(Node domNodePointer) {
		this.domNodePointer = domNodePointer;
	}
	/**
	 * @return the xPath
	 */
	public String getxPath() {
		return xPath;
	}
	/**
	 * @param xPath the xPath to set
	 */
	public void setxPath(String xPath) {
		this.xPath = xPath;
	}
}
