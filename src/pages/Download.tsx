
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download as DownloadIcon, Copy, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CodeBlock from "@/components/CodeBlock";
import Footer from "@/components/Footer";

const Download = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyCommand = async (command: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(platform);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error('Failed to copy command:', err);
    }
  };

  const unixUrl = "http://piccodescript.fly.dev/dl/install.sh"
  const win32Url = "http://piccodescript.fly.dev/dl/install.ps1"
  const unixCmd = `wget -O - ${unixUrl} | bash`
  const macOSCmd = `curl -sSL ${unixUrl} | bash`
  const win32Cmd = `iwr -useb ${win32Url} | iex`
  
  const installCommands = {
    macos: macOSCmd,
    linux: unixCmd,
    windows: win32Cmd
  };

  const exampleCode = `
IO  :: import std.io
Fs :: import std.fs
Error :: import std.errors

getContents :: ({fileName: path}) = 
 let 
   file := Fs::readToString(path)
   result := file catch return Error::error("Failed to read file: {err}")
 in Error::success(result)

result := getContents({fileName: "main.pics"}) catch err
IO::println(result)
`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Download PiccodeScript
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started with PiccodeScript in seconds. Choose your platform and start coding functionally.
            </p>
          </div>

          {/* Installation Commands */}
          <Card className="p-8 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quick Install</h2>
            
            <Tabs defaultValue="macos" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="macos">macOS</TabsTrigger>
                <TabsTrigger value="linux">Linux</TabsTrigger>
                <TabsTrigger value="windows">Windows</TabsTrigger>
              </TabsList>
              
              <TabsContent value="macos">
                <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
                  <code className="text-green-400 font-mono text-sm flex-1">
                    {installCommands.macos}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCommand(installCommands.macos, "macos")}
                    className="text-gray-400 hover:text-white ml-4"
                  >
                    {copiedCommand === "macos" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Requires macOS 10.15 or later
                </p>
              </TabsContent>
              
              <TabsContent value="linux">
                <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
                  <code className="text-green-400 font-mono text-sm flex-1">
                    {installCommands.linux}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCommand(installCommands.linux, "linux")}
                    className="text-gray-400 hover:text-white ml-4"
                  >
                    {copiedCommand === "linux" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Compatible with Ubuntu 18.04+, Debian 10+, CentOS 7+, and other major distributions
                </p>
              </TabsContent>
              
              <TabsContent value="windows">
                <div className="bg-blue-900 rounded-lg p-4 flex items-center justify-between">
                  <code className="text-blue-300 font-mono text-sm flex-1">
                    {installCommands.windows}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCommand(installCommands.windows, "windows")}
                    className="text-blue-300 hover:text-white ml-4"
                  >
                    {copiedCommand === "windows" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Requires Windows 10 or later. Run in PowerShell as Administrator
                </p>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Cross-platform Download */}
          <Card className="p-8 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Universal Binary</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Download the cross-platform JAR file and run it anywhere Java is installed
              </p>

              <Link to="https://picasso-releases.fly.dev/piccodescript/v0.2/">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3">
                  <ExternalLink className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  Download Latest
                </Button>
              </Link>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Version 0.2 - 2.0 MB
              </p>
            </div>
          </Card>

          {/* System Requirements */}
          <Card className="p-8 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">System Requirements</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Runtime Requirements</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Java JDK 21 or later</li>
                  <li>• 512 MB RAM minimum</li>
                  <li>• 100 MB disk space</li>
                  <li>• Any modern operating system</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Development Setup</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Maven 3.6+ for building from source</li>
                  <li>• Git for version control</li>
                  <li>• Your favorite text editor or IDE</li>
                  <li>• Terminal or command prompt</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Need to build from source? Check out our comprehensive build instructions.
              </p>
              <Link to="/documentation">
                <Button variant="outline" className="group">
                  <ExternalLink className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  View Build Instructions
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Start Example */}
          <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quick Start</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Once installed, create your first PiccodeScript script and run it:
            </p>
            <CodeBlock code={exampleCode} title="example.pic" />
            <div className="mt-6 bg-gray-900 rounded-lg p-4">
              <code className="text-green-400 font-mono text-sm">
                $ picoc run example.pic
              </code>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Download;
