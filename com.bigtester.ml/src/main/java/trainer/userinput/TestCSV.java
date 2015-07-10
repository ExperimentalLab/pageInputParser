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
package trainer.userinput;

// TODO: Auto-generated Javadoc
/**
 * This class TestCSV defines ....
 * @author Peidong Hu
 *
 */

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

/**
 * @author ashraf
 * 
 */
public class TestCSV{
	
	//Delimiter used in CSV file
	private static final String NEW_LINE_SEPARATOR = "\n";
	
	
	public static void writeCsvFile(List<String> mlInputs) {
		
		if (mlInputs.size()==0) return;
		
		//Create new students objects
		List<UserInputTrainingRecord> trainings = new ArrayList<UserInputTrainingRecord>();
		for (int index=0; index<mlInputs.size(); index++) {
			trainings.add(new UserInputTrainingRecord(" ", mlInputs.get(index)));
		}
		
		FileWriter fileWriter = null;
		
		CSVPrinter csvFilePrinter = null;
		
		//Create the CSVFormat object with "\n" as a record delimiter
        CSVFormat csvFileFormat = CSVFormat.TDF.withRecordSeparator(NEW_LINE_SEPARATOR);
				
		try {
			
			//initialize FileWriter object
			fileWriter = new FileWriter(UserInputsTrainer.TESTFILE);
			
			//initialize CSVPrinter object 
	        csvFilePrinter = new CSVPrinter(fileWriter, csvFileFormat);
	        
	        
			//Write a new student object list to the CSV file
			for (UserInputTrainingRecord student : trainings ) {
				List<String> studentDataRecord = new ArrayList<String>();
	            studentDataRecord.add(student.getInputLabelName());
	            studentDataRecord.add(student.getInputMLHtmlCode());
	            csvFilePrinter.printRecord(studentDataRecord);
			}

			System.out.println("CSV file was created successfully !!!");
			
		} catch (Exception e) {
			System.out.println("Error in CsvFileWriter !!!");
			e.printStackTrace();
		} finally {
			try {
				fileWriter.flush();
				fileWriter.close();
				csvFilePrinter.close();
			} catch (IOException e) {
				System.out.println("Error while flushing/closing fileWriter/csvPrinter !!!");
                e.printStackTrace();
			}
		}
	}
}

