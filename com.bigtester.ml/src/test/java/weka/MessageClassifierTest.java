package weka;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import org.testng.annotations.Test;

import weka.core.Utils;

public class MessageClassifierTest {
	@Test
	public void f() throws Exception {

		try {

			// Read message file into string.
			String messageName = "C:/Documents and Settings/Administrator/My Documents/Downloads/text_example/apply.txt";
			if (messageName.length() == 0) {
				throw new Exception("Must provide name of message file.");
			}
			FileReader m = new FileReader(messageName);
			StringBuffer message = new StringBuffer();
			int l;
			while ((l = m.read()) != -1) {
				message.append((char) l);
			}
			m.close();

			MessageClassifier messageCl;
			messageCl = new MessageClassifier();
			
			messageCl.classifyMessage(message.toString());
			String modelName = "modelA";
			// Save message classifier object.
			ObjectOutputStream modelOutObjectFile = new ObjectOutputStream(
					new FileOutputStream(modelName));
			modelOutObjectFile.writeObject(messageCl);
			modelOutObjectFile.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
