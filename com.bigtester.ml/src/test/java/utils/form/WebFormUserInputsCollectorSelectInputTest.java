package utils.form;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.custommonkey.xmlunit.HTMLDocumentBuilder;
import org.custommonkey.xmlunit.TolerantSaxDocumentBuilder;
import org.custommonkey.xmlunit.XMLUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.Test;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class WebFormUserInputsCollectorSelectInputTest {
	public final static String[] TEST_HTML_FILES = {
			"/src/test/resource/utils/form/Red Ventures Careers - Principal QA Engineer.html",
			"/src/test/resource/utils/form/Marketo Careers - Apply.html" };
	public final static String[] FORM_NAMES = { "", "jobviteframe" };

	@Test
	public void f() throws SAXException, IOException,
			ParserConfigurationException, TransformerException {
		for (int j = 0; j < TEST_HTML_FILES.length; j++) {
			WebDriver firefox = new FirefoxDriver();
			firefox.get("file:///" + System.getProperty("user.dir")
					+ TEST_HTML_FILES[j]);
			String xpathOfFrame = null;
			if (FORM_NAMES[j].length() > 0) {
				List<WebElement> iframes = firefox.findElements(By
						.id(FORM_NAMES[j]));
				xpathOfFrame = getAbsoluteXPath(iframes.get(0), firefox);
				firefox.switchTo().frame(iframes.get(0));
			}
			String source = firefox.getPageSource();

			DocumentBuilder db = DocumentBuilderFactory.newInstance()
					.newDocumentBuilder();
			InputSource is = new InputSource();
			is.setCharacterStream(new StringReader(source));
			Document doc;
			WebFormUserInputsCollector col;
			try {
				doc = db.parse(is);
				col = new WebFormUserInputsCollector(doc, xpathOfFrame);
			} catch (SAXException e) {
				TolerantSaxDocumentBuilder tolerantSaxDocumentBuilder = new TolerantSaxDocumentBuilder(
						XMLUnit.newTestParser());
				HTMLDocumentBuilder db1 = new HTMLDocumentBuilder(
						tolerantSaxDocumentBuilder);
				doc = db1.parse(new StringReader(source));
				col = new WebFormUserInputsCollector(doc, xpathOfFrame);
			}

			// System.out.println(source);

			System.out.println("\n*******************\n");
			System.out.println("\n*******************\n");
			for (UserInputDom dom : col.getUserInputs()) {

				printDocument(dom.getDomNodePointer(), System.out);
				System.out.println("\n--above Node print----\n");

				List<Node> nodes = dom.getMachineLearningDomHtmlPointers();
				if (nodes != null)
					for (Node node : nodes)
						printDocument(node, System.out);
				System.out.println("\n------above node ML code---------\n");
				printDocument(dom.getLabelDomPointer(), System.out);
				System.out
						.println("\n------above node lable code-----------------------\n");

				List<Node> nodes2 = dom.getAdditionalInfoNodes();
				if (nodes2 != null)
					for (Node node2 : nodes2)
						printDocument(node2, System.out);
				System.out
						.println("\n=======above node additional info code=========\n");

			}

			firefox.quit();
			System.out.println("\n=======****FILE PARSING IS DONE for: "
					+ TEST_HTML_FILES[j] + "****=========\n");
		}
	}

	public static void printDocument(Node doc, OutputStream out)
			throws IOException, TransformerException {
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer transformer = tf.newTransformer();
		transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
		// transformer.setOutputProperty(OutputKeys.METHOD, "xml");
		// transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		// transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
		// transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount",
		// "4");

		transformer.transform(new DOMSource(doc), new StreamResult(
				new OutputStreamWriter(out, "UTF-8")));
	}

	public static String getAbsoluteXPath(WebElement element, WebDriver driver) {
		return (String) ((JavascriptExecutor) driver)
				.executeScript(
						"function absoluteXPath(element) {"
								+ "var comp, comps = [];"
								+ "var parent = null;"
								+ "var xpath = '';"
								+ "var getPos = function(element) {"
								+ "var position = 1, curNode;"
								+ "if (element.nodeType == Node.ATTRIBUTE_NODE) {"
								+ "return null;"
								+ "}"
								+ "for (curNode = element.previousSibling; curNode; curNode = curNode.previousSibling) {"
								+ "if (curNode.nodeName == element.nodeName) {"
								+ "++position;"
								+ "}"
								+ "}"
								+ "return position;"
								+ "};"
								+

								"if (element instanceof Document) {"
								+ "return '/';"
								+ "}"
								+

								"for (; element && !(element instanceof Document); element = element.nodeType == Node.ATTRIBUTE_NODE ? element.ownerElement : element.parentNode) {"
								+ "comp = comps[comps.length] = {};"
								+ "switch (element.nodeType) {"
								+ "case Node.TEXT_NODE:"
								+ "comp.name = 'text()';" + "break;"
								+ "case Node.ATTRIBUTE_NODE:"
								+ "comp.name = '@' + element.nodeName;"
								+ "break;"
								+ "case Node.PROCESSING_INSTRUCTION_NODE:"
								+ "comp.name = 'processing-instruction()';"
								+ "break;" + "case Node.COMMENT_NODE:"
								+ "comp.name = 'comment()';" + "break;"
								+ "case Node.ELEMENT_NODE:"
								+ "comp.name = element.nodeName;" + "break;"
								+ "}" + "comp.position = getPos(element);"
								+ "}" +

								"for (var i = comps.length - 1; i >= 0; i--) {"
								+ "comp = comps[i];"
								+ "xpath += '/' + comp.name.toLowerCase();"
								+ "if (comp.position !== null) {"
								+ "xpath += '[' + comp.position + ']';" + "}"
								+ "}" +

								"return xpath;" +

								"} return absoluteXPath(arguments[0]);",
						element);
	}

}
