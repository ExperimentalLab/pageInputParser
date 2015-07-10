package trainer.userinput;



import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.io.IOException;

import org.testng.annotations.Test;

import edu.stanford.nlp.classify.Classifier;
import edu.stanford.nlp.classify.ColumnDataClassifier;
import edu.stanford.nlp.classify.LinearClassifier;
import edu.stanford.nlp.ling.Datum;
import edu.stanford.nlp.objectbank.ObjectBank;
import edu.stanford.nlp.util.ErasureUtils;

public class UserInputsTrainer {
	private static String propertyFile = "/src/test/resources/trainer/userinput/fieldtest.prop";
	private static String trainingFile = "/src/test/resources/trainer/userinput/train.txt";
	private static String testFile = "/src/test/resources/trainer/userinput/test.txt";
	
	public void train() throws ClassNotFoundException, IOException {
		ColumnDataClassifier cdc = new ColumnDataClassifier(
				System.getProperty("user.dir") + propertyFile);
		Classifier<String, String> cl = cdc.makeClassifier(cdc
				.readTrainingExamples(System.getProperty("user.dir") + trainingFile));
		for (String line : ObjectBank.getLineIterator(System.getProperty("user.dir") + testFile, "utf-8")) {
			// instead of the method in the line below, if you have the
			// individual elements
			// already you can use cdc.makeDatumFromStrings(String[])
			Datum<String, String> d = cdc.makeDatumFromLine(line);
			System.out.println(line + "  ==>  " + cl.classOf(d));
		}

		demonstrateSerialization();
	}

	public static void demonstrateSerialization() throws IOException,
			ClassNotFoundException {
		System.out
				.println("Demonstrating working with a serialized classifier");
		ColumnDataClassifier cdc = new ColumnDataClassifier(
				"C:/Documents and Settings/Administrator/My Documents/Downloads/standford_example/fieldtest.prop");
		Classifier<String, String> cl = cdc.makeClassifier(cdc
				.readTrainingExamples("C:/Documents and Settings/Administrator/My Documents/Downloads/standford_example/train.txt"));
		
		Classifier<String, String> cl2 = cdc.makeClassifier(cdc
				.readTrainingExamples("C:/Documents and Settings/Administrator/My Documents/Downloads/standford_example/test.txt"));
		
		
		// Exhibit serialization and deserialization working. Serialized to
		// bytes in memory for simplicity
		System.out.println();
		System.out.println();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(baos);
		oos.writeObject(cl);
		oos.close();
		byte[] object = baos.toByteArray();
		ByteArrayInputStream bais = new ByteArrayInputStream(object);
		ObjectInputStream ois = new ObjectInputStream(bais);
		LinearClassifier<String, String> lc = ErasureUtils.uncheckedCast(ois
				.readObject());
		ois.close();
		ColumnDataClassifier cdc2 = new ColumnDataClassifier(
				"C:/Documents and Settings/Administrator/My Documents/Downloads/standford_example/fieldtest.prop");

		// We compare the output of the deserialized classifier lc versus the
		// original one cl
		// For both we use a ColumnDataClassifier to convert text lines to
		// examples
		for (String line : ObjectBank.getLineIterator(
				"C:/Documents and Settings/Administrator/My Documents/Downloads/standford_example/test.txt", "utf-8")) {
			Datum<String, String> d = cdc.makeDatumFromLine(line);
			Datum<String, String> d2 = cdc2.makeDatumFromLine(line);
			System.out.println(cl.classOf(d) + "  =origi=>  " + line );
			System.out.println(cl2.classOf(d)+ "  =test origi=> " + line);
			System.out.println("score against email: " + lc.scoreOf(d2, "email") + "  =deser=>  " +  line );
			System.out.println("score against firstname: " + lc.scoreOf(d2, "firstname") + "  =deser=>  " +  line );
			System.out.println("score against reenterpassword: " + lc.scoreOf(d2, "reenterpassword") + "  =deser=>  " +  line );
			System.out.println("score against password: " + lc.scoreOf(d2, "password") + "  =deser=>  " +  line );
			System.out.println("score against lastname: " + lc.scoreOf(d2, "lastname") + "  =deser=>  " +  line );
			System.out.println("score against "+ cl.classOf(d) + ": " + lc.scoreOf(d2, cl.classOf(d)) + "  =deser=>  " +  line );
			System.out.println("==========================");
		}
	}

}
