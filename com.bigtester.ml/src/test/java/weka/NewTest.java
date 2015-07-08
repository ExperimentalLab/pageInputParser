package weka;

import java.io.File;

import org.testng.annotations.Test;

import weka.classifiers.trees.J48;
import weka.core.Instances;
import weka.core.converters.TextDirectoryLoader;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.StringToWordVector;

public class NewTest {
	@Test
	public void f() throws Exception {
		// convert the directory into a dataset
		TextDirectoryLoader loader = new TextDirectoryLoader();
		loader.setDirectory(new File("C:/Documents and Settings/Administrator/My Documents/Downloads/text_example/text_example"));
		Instances dataRaw = loader.getDataSet();
		// System.out.println("\n\nImported data:\n\n" + dataRaw);

		// apply the StringToWordVector
		// (see the source code of setOptions(String[]) method of the filter
		// if you want to know which command-line option corresponds to which
		// bean property)
		StringToWordVector filter = new StringToWordVector();
		filter.setInputFormat(dataRaw);
		Instances dataFiltered = Filter.useFilter(dataRaw, filter);
		// System.out.println("\n\nFiltered data:\n\n" + dataFiltered);

		// train J48 and output model
		J48 classifier = new J48();
		classifier.buildClassifier(dataFiltered);
		System.out.println("\n\nClassifier model:\n\n" + classifier);
	}
	
	
}
