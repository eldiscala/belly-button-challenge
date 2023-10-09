 //Place url in constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


//Create bar chart
function bar(sample) {
    //get otu_ids, labels and sample values
    let otu_ids =sample.otu_ids.slice(0,10).reverse();
    let otu_labels = sample.otu_labels.slice(0,10).reverse();
    let sample_values = sample.sample_values.slice(0,10).reverse();
  
    let otu_texts = otu_ids.map(id=>`OTU ${id}`);

    //Log console
    console.log(otu_ids, otu_labels, sample_values);

    //set up trace for bar chart
    let trace = {
        x: sample_values,
        y: otu_texts,
        text: otu_labels,
        type: 'bar',
        orientation: 'h'
    
    };
 
    // Set up layout
    let layout = {
        title: `Top 10 OTUs for Sample`,
        xaxis: { title: 'Sample Values' },
        yaxis: { title: 'OTU IDs' }
    };

    // Call Plotly
    Plotly.newPlot('bar', [trace], layout);

};

// Create bubble chart
function bubble(sample) {
    // Get otu_ids, labels, and sample values
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;
    let sample_values = sample.sample_values;

    // Log console
    console.log(otu_ids, otu_labels, sample_values);

    // Set up trace for bubble chart
    let trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids
        }
    };

    // Set up layout
    let layout = {
        title: `Bubble Chart for Sample`,
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' }
    };

    // Call Plotly
    Plotly.newPlot('bubble', [trace], layout);
}

//new function
function getSubjectData(all_items, subject_id){
    let matching_samples = all_items.filter(sample => sample.id == subject_id);
    let matching_sample = matching_samples[0];
    return matching_sample;
}


//Display meta data
function metadata(all_metadata, subject_id) {
    let subjectMetadata = getSubjectData(all_metadata, subject_id);
    console.log(subjectMetadata);
    console.log("metadata");
    

    // Select the HTML element where you want to display metadata    
    let demoBox = d3.select("#sample-metadata"); 
    // Clear existing content in the box
    demoBox.html("");
    
    //loop through dictionary with d3  Object.entries(subjectMetadata).forEach(([key, value]) => {
    Object.entries(subjectMetadata).forEach(([key, value]) => {
    // Append each key-value pair to the demoBox
    demoBox.append("p").text(`${key}: ${value}`);
    });
    
}

//Update plots when new sample is selected
function optionChanged(subject_id) {
    d3.json(url).then((data) => {
        let subjectSample = getSubjectData(data.samples, subject_id);
        bar(subjectSample);
        bubble(subjectSample);
        metadata(data.metadata, subject_id);
    });
}


//Initializae data
function init() {
    //Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");  
    d3.json(url).then((data) => {
        let ids = data.names;
        //loop
        ids.forEach(id=> {
            dropdownMenu.append("option").attr("value", id).text(id);
        });
        optionChanged(ids[0]);
    });
    console.log("init");

}
init();