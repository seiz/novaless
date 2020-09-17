//
// Less Extension for Nova
// LessService.js
//

class LessService {
	constructor() {

	}

  get getArgs() {
    var cssStyle  = nova.config.get('imd.Less.cssStyle');
    var sourceMap = nova.config.get('imd.Less.sourceMap'); 
    var execPath  = nova.config.get('imd.Less.execPath');       

    if(!execPath || execPath=="") {
      console.log("Using default lessc binary");
      execPath = nova.extension.path + '/node_modules/less/bin/lessc'; 
    }
    else{
      console.log("Using lessc binary at:" + execPath);
    }
    var options = [];
    options.push(execPath);
     
    if(cssStyle == 'Compressed') {
      options.push('-s'); 
      options.push('-x'); 
    }
    
    if(sourceMap == 'Embedded') {
      options.push('--source-map-inline'); 
    } else if(sourceMap == 'External') {
      options.push('--source-map'); 
    } 

    return options;
  }
  
  /*
  Update the file sets
  */  

  async compileLessUpdate(editor) {
    var source   = editor.document.path;
    console.log("Lessc on: " + source);
    // Check that this is enabled 
    if(source.slice((source.lastIndexOf(".") - 1 >>> 0) + 2) != 'less') { return }

    // set output filename and path
    var fileext = "css";
    if ( nova.config.get('imd.Less.cssStyle')=="Compressed" ){
     fileext = "min.css"
    }
    var outputFile = source.slice(0, -'less'.length) + fileext; // file.less becomes file.css
    
    var args = this.getArgs;
        //args.push('--update');
        args.push(source);   
        args.push(outputFile);
    
    var options = { args: args };
    
    var process = new Process("/usr/bin/env", options);
    
    var stdOut = new Array;
    process.onStdout(function(line) {
      stdOut.push(line.trim());
    });
    
    var stdErr = new Array;
    process.onStderr(function(line) {
      stdErr.push(line.trim());
    });

    process.onDidExit(function() {
      
      if(stdErr.length > 0) {

        if(nova._notificationTimer) {
          clearTimeout(nova._notificationTimer);
        }        
        
        var message = stdErr[0] + "\n";
        if(stdErr.length > 1) {
          message = message + stdErr[stdErr.length-1];
        }
   
        let request = new NotificationRequest("less-error");      
        request.title = nova.localize("Less Compile Error");
        request.body = nova.localize(stdErr[0] + "\n" + stdErr[stdErr.length-1]);  
        request.actions = [nova.localize("Dismiss")];        
        let promise = nova.notifications.add(request);
        
        // hide the notification after 5 seconds
        nova._notificationTimer = setTimeout(function() { 
          nova.notifications.cancel("less-error");         
        }, 10000);

      } else {
        // Hide any notifications of the previous error
        nova.notifications.cancel("less-error");          
      }
      
    });

    process.start();

    return true;
  }
}

module.exports = LessService;
