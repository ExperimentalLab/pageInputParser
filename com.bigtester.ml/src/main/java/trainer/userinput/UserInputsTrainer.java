package trainer.userinput;



import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVParser;
import org.apache.commons.io.FilenameUtils;
import org.testng.annotations.Test;

import com.google.common.collect.Iterables;

import edu.stanford.nlp.classify.Classifier;
import edu.stanford.nlp.classify.ColumnDataClassifier;
import edu.stanford.nlp.classify.LinearClassifier;
import edu.stanford.nlp.ling.Datum;
import edu.stanford.nlp.objectbank.ObjectBank;
import edu.stanford.nlp.util.ErasureUtils;

public class UserInputsTrainer {
	public static String PROPERTYFILE = System.getProperty("user.dir") + "/src/test/resources/trainer/userinput/fieldtest.prop";
	public static String TRAININGFILE = System.getProperty("user.dir") + "/src/test/resources/trainer/userinput/train.txt";
	public static String TESTFILE = System.getProperty("user.dir") + "/src/test/resources/trainer/userinput/test.txt";
	public static String CACHEPATH = System.getProperty("user.dir") + "/src/test/resources/trainer/userinput/cache/";
	public static String SOURCEFILESPATH = System.getProperty("user.dir")+ "/src/test/resources/utils/form/";
	public static String[] getAllFilesNeedToTrain() {
		String directory = UserInputsTrainer.SOURCEFILESPATH;
		File[] files = new File(directory).listFiles();
		List<String> filenames = new ArrayList<String>();
		
		for (File file : files) {
			if (file.isFile()) {
				if(!getAllFileBasenamesInCache().contains(FilenameUtils.getBaseName(file.getAbsolutePath())))
					filenames.add(file.getAbsolutePath());
			}
		}
		return (String[]) filenames.toArray(new String[filenames.size()]);
	}
	
	public static List<String> getAllFileBasenamesInCache() {
		String directory = UserInputsTrainer.CACHEPATH;
		File[] files = new File(directory).listFiles();
		List<String> filenames = new ArrayList<String>();
		
		for (File file : files) {
			if (file.isFile()) {
				filenames.add(FilenameUtils.getBaseName(file.getAbsolutePath()));
			}
		}
		return filenames;
	}
	
	
	public List<UserInputTrainingRecord> train() throws ClassNotFoundException, IOException {
		ColumnDataClassifier cdc = new ColumnDataClassifier(
				 PROPERTYFILE);
		Classifier<String, String> cl = cdc.makeClassifier(cdc
				.readTrainingExamples( TRAININGFILE));
		for (String line : ObjectBank.getLineIterator( TESTFILE, "utf-8")) {
			// instead of the method in the line below, if you have the
			// individual elements
			// already you can use cdc.makeDatumFromStrings(String[])
			Datum<String, String> d = cdc.makeDatumFromLine(line);
			System.out.println(line + "  ==>  " + cl.classOf(d));
		}

		return demonstrateSerialization();
	}

	public List<UserInputTrainingRecord> demonstrateSerialization() throws IOException,
			ClassNotFoundException {
		System.out
				.println("Demonstrating working with a serialized classifier");
		ColumnDataClassifier cdc = new ColumnDataClassifier(
				 PROPERTYFILE);
		Classifier<String, String> cl = cdc.makeClassifier(cdc
				.readTrainingExamples( TRAININGFILE));
		
		Classifier<String, String> cl2 = cdc.makeClassifier(cdc
				.readTrainingExamples( TESTFILE));
		
		
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
				 PROPERTYFILE);

		// We compare the output of the deserialized classifier lc versus the
		// original one cl
		// For both we use a ColumnDataClassifier to convert text lines to
		// examples
		List<UserInputTrainingRecord> retVal = new ArrayList<UserInputTrainingRecord>();
		for (String line : ObjectBank.getLineIterator(
				 TESTFILE, "utf-8")) {
			Datum<String, String> d = cdc.makeDatumFromLine(line);
			Datum<String, String> d2 = cdc2.makeDatumFromLine(line);
			if (TrainingFileDB.parseLine(line) != null)
				retVal.add(new UserInputTrainingRecord(cl.classOf(d),TrainingFileDB.parseLine(line).getInputMLHtmlCode()));
			
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
		return retVal;
	}

}
