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

import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.Test;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class WebFormUserInputsCollectorTest {
	@Test
	public void f() throws SAXException, IOException,
			ParserConfigurationException, TransformerException {
		WebDriver firefox = new FirefoxDriver();
		firefox.get("file:///c:/test.html");
		// List<WebElement> iframes =
		// firefox.findElements(By.id("jobviteframe"));
		// for (WebElement frame : iframes) {
		// firefox.switchTo().frame(frame);
		String source = firefox.getPageSource();
		// if (StringUtils.isEmpty(source) || source.length() < 200) continue;
		// System.out.print(source);
		DocumentBuilder db = DocumentBuilderFactory.newInstance()
				.newDocumentBuilder();
		InputSource is = new InputSource();
		is.setCharacterStream(new StringReader(source));

		Document doc = db.parse(is);
		WebFormUserInputsCollector col = new WebFormUserInputsCollector(doc);
		System.out.println("*******************");
		System.out.println("*******************");
		for (UserInputDom dom : col.getUserInputs()) {
			List<Node> nodes = dom.getMachineLearningDomHtmlPointers();
			if (nodes != null)
				for (Node node : nodes)
					printDocument(node, System.out);
			System.out.println("---------------");
			List<Node> nodes2 = dom.getAdditionalInfoNodes();
			if (nodes2 != null)
				for (Node node2 : nodes2)
					printDocument(node2, System.out);
			System.out.println("================");

		}

		// }
		firefox.quit();
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
}
