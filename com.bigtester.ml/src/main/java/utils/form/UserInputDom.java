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

import java.util.List;

import org.w3c.dom.Node;

// TODO: Auto-generated Javadoc
/**
 * This class InputDom defines ....
 * @author Peidong Hu
 *
 */
public class UserInputDom extends WebElementDom {
	private Node labelDomPointer;
	private List<Node> machineLearningDomHtmlPointers;
	private List<Node> additionalInfoNodes;
	private UserInputDom previousSibling;
	private UserInputDom nextSibling;
	private Node previousUserViewableHtmlSibling;
	private Node nextUserViewableHtmlSibling;
	private Node parentFormPointer;
	public UserInputDom(Node inputDomNodePointer) {
		super(inputDomNodePointer);
	}
	/**
	 * @return the labelDomPointer
	 */
	public final Node getLabelDomPointer() {
		return labelDomPointer;
	}
	/**
	 * @param labelDomPointer the labelDomPointer to set
	 */
	public final void setLabelDomPointer(Node labelDomPointer) {
		this.labelDomPointer = labelDomPointer;
	}
	/**
	 * @return the machineLearningDomHtmlPointer
	 */
	public final List<Node> getMachineLearningDomHtmlPointers() {
		return machineLearningDomHtmlPointers;
	}
	/**
	 * @param machineLearningDomHtmlPointer the machineLearningDomHtmlPointer to set
	 */
	public final void setMachineLearningDomHtmlPointer(
			List<Node> machineLearningDomHtmlPointer) {
		this.machineLearningDomHtmlPointers = machineLearningDomHtmlPointer;
	}
	/**
	 * @return the additionalInfoNodes
	 */
	public final List<Node> getAdditionalInfoNodes() {
		return additionalInfoNodes;
	}
	/**
	 * @param additionalInfoNodes the additionalInfoNodes to set
	 */
	public final void setAdditionalInfoNodes(List<Node> additionalInfoNodes) {
		this.additionalInfoNodes = additionalInfoNodes;
	}
	/**
	 * @return the previousSibling
	 */
	public final UserInputDom getPreviousSibling() {
		return previousSibling;
	}
	/**
	 * @param previousSibling the previousSibling to set
	 */
	public final void setPreviousSibling(UserInputDom previousSibling) {
		this.previousSibling = previousSibling;
	}
	/**
	 * @return the nextSibling
	 */
	public final UserInputDom getNextSibling() {
		return nextSibling;
	}
	/**
	 * @param nextSibling the nextSibling to set
	 */
	public final void setNextSibling(UserInputDom nextSibling) {
		this.nextSibling = nextSibling;
	}
//		labelDomPointer = findLabelNode();
//		additionalInfoNodes = findAdditionalInfoNodes();
//		previousSibling = findPreviousSibling();
//		nextSibling = findNextSibling();
	/**
	 * @return the previousUserViewableHtmlSibling
	 */
	public Node getPreviousUserViewableHtmlSibling() {
		return previousUserViewableHtmlSibling;
	}
	/**
	 * @param previousUserViewableHtmlSibling the previousUserViewableHtmlSibling to set
	 */
	public void setPreviousUserViewableHtmlSibling(
			Node previousUserViewableHtmlSibling) {
		this.previousUserViewableHtmlSibling = previousUserViewableHtmlSibling;
	}
	/**
	 * @return the nextUserViewableHtmlSibling
	 */
	public Node getNextUserViewableHtmlSibling() {
		return nextUserViewableHtmlSibling;
	}
	/**
	 * @param nextUserViewableHtmlSibling the nextUserViewableHtmlSibling to set
	 */
	public void setNextUserViewableHtmlSibling(
			Node nextUserViewableHtmlSibling) {
		this.nextUserViewableHtmlSibling = nextUserViewableHtmlSibling;
	}
	/**
	 * @return the parentFormPointer
	 */
	public Node getParentFormPointer() {
		return parentFormPointer;
	}
	/**
	 * @param parentFormPointer the parentFormPointer to set
	 */
	public void setParentFormPointer(Node parentFormPointer) {
		this.parentFormPointer = parentFormPointer;
	}
	
	
//	private Node findLabelNode() {
//		
//	}
//	private List<Node> findAdditionalInfoNodes() {
//		
//	}
//	
//	private UserInputDom findPreviousSibling() {
//		
//	}
//	private UserInputDom findNextSibling() {
//		
//	}
}
