from flask import Flask, jsonify
from flask_cors import CORS
import nbformat

app = Flask(__name__)
CORS(app)  # ✅ Enables CORS for all routes

def extract_outputs(notebook_path):
    """Extracts output from a Jupyter Notebook (.ipynb) file."""
    try:
        with open(notebook_path, "r", encoding="utf-8") as f:
            notebook = nbformat.read(f, as_version=4)

        outputs = []
        for cell in notebook.cells:
            if cell.cell_type == "code":
                for output in cell.get("outputs", []):
                    if "text" in output:
                        outputs.append(output["text"])
        return outputs

    except Exception as e:
        return [f"Error reading notebook: {str(e)}"]

@app.route('/', methods=['GET'])
def get_notebook_output():
    """API endpoint to return notebook outputs."""
    notebook_path = "KubeAI2.ipynb"
    outputs = extract_outputs(notebook_path)
    return jsonify({"outputs": outputs})

if __name__ == '__main__':
    app.run(debug=True)
