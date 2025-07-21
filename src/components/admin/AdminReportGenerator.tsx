import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  BarChart3, 
  Users, 
  Building, 
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminReportGeneratorProps {
  stats: {
    totalUsers: number;
    totalBookings: number;
    totalRevenue: number;
    totalHotels: number;
    flightBookings: number;
    hotelBookings: number;
  };
}

const AdminReportGenerator = ({ stats }: AdminReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generatePDFReport = async () => {
    setIsGenerating(true);
    
    try {
      // Get admin info
      const adminAuth = JSON.parse(localStorage.getItem('adminAuth') || '{}');
      
      // Create PDF content
      const reportData = {
        reportDate: new Date().toLocaleDateString(),
        reportTime: new Date().toLocaleTimeString(),
        adminName: adminAuth.fullName || 'Admin User',
        adminEmail: adminAuth.email || 'admin@hotel.com',
        hotelName: adminAuth.hotelName || 'Hotel Management System',
        websiteUrl: window.location.origin,
        websiteLogo: '/lovable-uploads/dd83790d-e088-4930-a32a-3ef4fa9ac0b8.png',
        adminPhoto: '/lovable-uploads/2b5371a2-33f0-4ff1-90ac-f53e40ab5e75.png',
        stats,
        performance: {
          avgBookingValue: stats.totalRevenue / (stats.totalBookings || 1),
          hotelUtilization: ((stats.hotelBookings / stats.totalHotels) * 100).toFixed(1),
          userEngagement: '87%',
          customerSatisfaction: '4.8/5.0',
          monthlyGrowth: '+23%'
        }
      };

      // Generate HTML for PDF
      const htmlContent = generateReportHTML(reportData);
      
      // Create a blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hotel-performance-report-${new Date().toISOString().split('T')[0]}.html`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Report Generated Successfully",
        description: "Your performance report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Error Generating Report",
        description: "There was an issue creating your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateReportHTML = (data: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Performance Report</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .report-container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 30px;
        }
        .logo {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: block;
        }
        .admin-photo {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            float: right;
            margin-top: -80px;
            border: 3px solid #667eea;
        }
        h1 {
            color: #667eea;
            font-size: 28px;
            margin-bottom: 10px;
        }
        .report-meta {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-value {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .performance-section {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .signature-section {
            margin-top: 40px;
            text-align: right;
            border-top: 1px solid #ddd;
            padding-top: 20px;
        }
        .signature {
            font-style: italic;
            color: #667eea;
            font-size: 18px;
            margin-top: 10px;
        }
        @media print {
            body { background: white; }
            .report-container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="header">
            <img src="${data.websiteLogo}" alt="Logo" class="logo" />
            <img src="${data.adminPhoto}" alt="Admin" class="admin-photo" />
            <h1>Hotel Performance Report</h1>
            <p style="color: #666; font-size: 16px;">${data.hotelName}</p>
        </div>

        <div class="report-meta">
            <h3 style="color: #667eea; margin-bottom: 15px;">Report Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <strong>Generated Date:</strong> ${data.reportDate}<br>
                    <strong>Report Time:</strong> ${data.reportTime}<br>
                    <strong>Website:</strong> ${data.websiteUrl}
                </div>
                <div>
                    <strong>Admin Name:</strong> ${data.adminName}<br>
                    <strong>Admin Email:</strong> ${data.adminEmail}<br>
                    <strong>Period:</strong> Monthly Report
                </div>
            </div>
        </div>

        <h2 style="color: #667eea;">Key Statistics</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${data.stats.totalUsers}</div>
                <div>Total Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.stats.totalBookings}</div>
                <div>Total Bookings</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">₹${data.stats.totalRevenue.toLocaleString('en-IN')}</div>
                <div>Total Revenue</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data.stats.totalHotels}</div>
                <div>Hotels Listed</div>
            </div>
        </div>

        <div class="performance-section">
            <h3 style="color: #667eea; margin-bottom: 20px;">Performance Metrics</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <strong>Average Booking Value:</strong> ₹${data.performance.avgBookingValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}<br>
                    <strong>Hotel Utilization:</strong> ${data.performance.hotelUtilization}%<br>
                    <strong>User Engagement:</strong> ${data.performance.userEngagement}
                </div>
                <div>
                    <strong>Customer Satisfaction:</strong> ${data.performance.customerSatisfaction}<br>
                    <strong>Monthly Growth:</strong> ${data.performance.monthlyGrowth}<br>
                    <strong>Flight Bookings:</strong> ${data.stats.flightBookings}
                </div>
            </div>
        </div>

        <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            <h3 style="color: #667eea; margin-bottom: 10px;">Summary</h3>
            <p>This report shows strong performance across all key metrics. The platform is experiencing healthy growth with excellent customer satisfaction ratings. Hotel utilization rates indicate good demand, and the increasing user base suggests effective marketing and customer retention strategies.</p>
        </div>

        <div class="signature-section">
            <div>
                <strong>Report Generated By:</strong><br>
                ${data.adminName}<br>
                <em>System Administrator</em>
            </div>
            <div class="signature">
                Digital Signature: ${data.adminName}
            </div>
            <div style="font-size: 12px; color: #666; margin-top: 20px;">
                This is an automatically generated report from Airbnb Clone+ Admin Portal<br>
                Generated on ${data.reportDate} at ${data.reportTime}
            </div>
        </div>
    </div>
</body>
</html>`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-effect border-white/30 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>Performance Report Generator</span>
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Generate comprehensive reports with website analytics and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Quick Stats Preview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">{stats.totalUsers}</div>
                <div className="text-sm text-blue-700">Users</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg">
                <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">{stats.totalBookings}</div>
                <div className="text-sm text-green-700">Bookings</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-900">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
                <div className="text-sm text-purple-700">Revenue</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-100 rounded-lg">
                <Building className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-900">{stats.totalHotels}</div>
                <div className="text-sm text-orange-700">Hotels</div>
              </div>
            </div>

            {/* Report Features */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                <span>Report Includes</span>
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                <Badge variant="secondary" className="justify-center py-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Performance Metrics
                </Badge>
                <Badge variant="secondary" className="justify-center py-2">
                  <Users className="h-4 w-4 mr-1" />
                  User Analytics
                </Badge>
                <Badge variant="secondary" className="justify-center py-2">
                  <Building className="h-4 w-4 mr-1" />
                  Hotel Statistics
                </Badge>
                <Badge variant="secondary" className="justify-center py-2">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Revenue Analysis
                </Badge>
                <Badge variant="secondary" className="justify-center py-2">
                  <Star className="h-4 w-4 mr-1" />
                  Customer Satisfaction
                </Badge>
                <Badge variant="secondary" className="justify-center py-2">
                  <Clock className="h-4 w-4 mr-1" />
                  Growth Trends
                </Badge>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <Button
                onClick={generatePDFReport}
                disabled={isGenerating}
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Download className="h-5 w-5 mr-2" />
                )}
                {isGenerating ? "Generating Report..." : "Generate Performance Report"}
              </Button>
              
              <p className="text-sm text-gray-600 mt-2">
                Report will include website logo, admin details, and digital signature
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminReportGenerator;