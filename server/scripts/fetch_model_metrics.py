import mlflow
import sys

# Get the experiment name from the command-line arguments
experiment_name = sys.argv[1]

# Set the experiment
client = mlflow.tracking.MlflowClient()
experiment = client.get_experiment_by_name(experiment_name)

if experiment is None:
    print(f"No experiment found with name {experiment_name}")
    sys.exit(1)

# Get the list of runs for the experiment
runs = client.search_runs([experiment.experiment_id])

# Iterate over runs and print relevant metrics and parameters
for run in runs:
    print(f"Run ID: {run.info.run_id}")
    print(f"Model type: {run.data.params['model_type']}")
    print(f"Generations: {run.data.params['generations']}")
    print(f"Population size: {run.data.params['population_size']}")
    print(f"Score: {run.data.metrics['score']}")
    print("---")
