const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  message: string;
  conversationId: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message, conversationId }: ChatRequest = await req.json();

    if (!message || !conversationId) {
      return new Response(
        JSON.stringify({ error: "Message and conversationId are required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const response = generateResponse(message);

    return new Response(
      JSON.stringify({ response }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm happy to help you learn more about this portfolio. You can ask me about the developer's skills, projects, experience, or anything else you'd like to know!";
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return "This developer has strong expertise in modern web technologies including React, TypeScript, Vue.js, Node.js, Python, PostgreSQL, and Supabase. They're also proficient with tools like Docker, Git, and Figma. The focus is on full-stack development with an emphasis on creating scalable, maintainable applications.";
  }

  if (lowerMessage.includes('project')) {
    return "The portfolio showcases several impressive projects including:\n\n1. E-Commerce Platform - A full-stack solution with real-time inventory management and secure payments\n2. AI Content Generator - An AI-powered tool for creating marketing content\n3. Task Management App - A collaborative platform with real-time updates\n\nEach project demonstrates proficiency in modern technologies and best practices.";
  }

  if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
    return "The developer has over 5 years of experience in web development, specializing in creating modern, responsive applications. They're passionate about building digital experiences and constantly learning new technologies to stay at the forefront of web development.";
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('work together')) {
    return "Great question! You can reach out through the contact form on this portfolio, or directly via email at contact@example.com. The developer is always open to discussing new opportunities and collaborations!";
  }

  if (lowerMessage.includes('react') || lowerMessage.includes('frontend')) {
    return "The developer has strong frontend expertise, particularly with React and TypeScript. They're skilled at building responsive, performant user interfaces using modern frameworks and best practices. Experience includes working with Vue.js, Tailwind CSS, and various state management solutions.";
  }

  if (lowerMessage.includes('backend') || lowerMessage.includes('database') || lowerMessage.includes('server')) {
    return "On the backend, the developer works with Node.js, Python, and has strong database skills with PostgreSQL and Supabase. They're experienced in building RESTful APIs, handling authentication, and implementing secure, scalable backend architectures.";
  }

  if (lowerMessage.includes('what can you') || lowerMessage.includes('help')) {
    return "I can help answer questions about:\n\n• The developer's technical skills and expertise\n• Featured projects and their technologies\n• Professional background and experience\n• How to get in touch for opportunities\n• Specific technologies used in the portfolio\n\nFeel free to ask me anything!";
  }

  return "That's an interesting question! I'm here to help you learn more about this developer's skills, projects, and experience. Could you be more specific about what you'd like to know? You can ask about their technical expertise, featured projects, or how to get in touch!";
}
